import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import AppError from "../utils/appError.js";
import crypto from "crypto";
import Email from "../utils/email.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    data: user,
  });
};

const createSendEmailVerificationToken = async (user, req) => {
  // 1) create email verification token
  const verificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // 2) Send verification email
  try {
    const verificationURL = `${req.protocol}://localhost:5173/auth/verifyEmail/${verificationToken}`;
    await new Email(user, verificationURL).sendEmailVerification();
  } catch (err) {
    console.error("Error sending email:", err);
    throw new AppError(
      "There was an error sending the email. Try again later!",
      500,
    );
  }
};

export const signup = async (req, res, next) => {
  // 1) Create user
  const { email, name, password, passwordConfirm } = req.body;
  const user = await User.create({
    email,
    name,
    password,
    passwordConfirm,
  });

  // 2) Send email verification token
  try {
    await createSendEmailVerificationToken(user, req);

    // 3) Send response
    res.status(201).json({
      status: "success",
      message:
        "User created successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    return next(
      error || new AppError("Failed to send verification email.", 500),
    );
  }
};

export const login = async (req, res, next) => {
  // 1) check if email and password exist
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const { email, password } = req.body;

  // 2) check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) check if user exists and password is correct
  if (!user.emailVerified) {
    return next(
      new AppError("Please verify your email before logging in.", 401),
    );
  }

  // 4) if everything is ok send cookie and token
  createSendToken(user, 200, res);
};

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401),
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

export const logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };

export const getMe = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    status: "success",
    data: user,
  });
};

export const forgotPassword = async (req, res, next) => {
  // 1) Get user based on POSTed email
  if (!req.body.email) {
    return next(new AppError("Please provide your email address.", 400));
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://localhost:5173/auth/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500,
      ),
    );
  }

  //// REMOVE resetToken LATER
  res.status(200).json({
    status: "success",
    message: "Token sent to email!",
    // resetToken,
  });
};

export const resetPassword = async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // 2) Find the user with the hashed token
  // and check if the token has not expired
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Token is invalid or has expired.", 400));
  }

  // 3) If token is valid, set the new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
};

export const updatePassword = async (req, res, next) => {
  // 1) Check if current password, new password and confirm new password are provided
  if (
    !req.body.currentPassword ||
    !req.body.newPassword ||
    !req.body.newPasswordConfirm
  ) {
    return next(
      new AppError(
        "Please provide current password, new password and confirm new password.",
        400,
      ),
    );
  }
  // 2) Get user from collection
  const user = await User.findOne({ _id: req.user._id }).select("+password");

  // 3) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is incorrect.", 401));
  }

  // 4) If so, update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  createSendToken(user, 200, res);
};

export const verifyEmail = async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // 2) Find the user with the hashed token
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  // 3) If token is valid, set emailVerified to true and remove the token fields
  if (!user) {
    return next(new AppError("Token is invalid or has expired.", 400));
  }

  // 4) Update user fields and save
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });

  // 5) Send response
  res.status(200).json({
    status: "success",
    message: "Email verified successfully.",
  });
};

export const resendVerificationEmail = async (req, res, next) => {
  // 1) Get user based on the email provided in the request body
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Please provide your email address.", 400));
  }

  // 2) Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }

  // 3) Check if the user's email is already verified
  if (user.emailVerified) {
    return next(new AppError("Email is already verified.", 400));
  }

  try {
    // 4) Create and send email verification token
    await createSendEmailVerificationToken(user, req);

    // 5) Send response
    res.status(200).json({
      status: "success",
      message:
        "Verification email resent successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    return next(error);
  }
};
