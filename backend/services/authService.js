import { promisify } from "util";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as userRepository from "../repository/userRepository.js";
import AppError from "../utils/appError.js";
import Email from "../utils/email.js";
import createTokenPayload from "../utils/createTokenPayload.js";

const sendVerificationEmail = async (user, protocol) => {
  const verificationToken = user.createEmailVerificationToken();
  await userRepository.save(user, { validateBeforeSave: false });

  try {
    const verificationURL = `${protocol}://localhost:5173/auth/verifyEmail/${verificationToken}`;
    await new Email(user, verificationURL).sendEmailVerification();
  } catch (err) {
    console.error("Error sending email:", err);
    throw new AppError(
      "There was an error sending the email. Try again later!",
      500,
    );
  }
};

export const signup = async (
  { email, name, password, passwordConfirm },
  protocol,
) => {
  const user = await userRepository.create({
    email,
    name,
    password,
    passwordConfirm,
  });

  try {
    await sendVerificationEmail(user, protocol);
  } catch (error) {
    await userRepository.deleteById(user._id);
    throw error || new AppError("Failed to send verification email.", 500);
  }
};

export const login = async (email, password) => {
  const user = await userRepository.findByEmailWithPassword(email);
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }

  if (!user.emailVerified) {
    throw new AppError("Please verify your email before logging in.", 401);
  }

  return createTokenPayload(user);
};

export const verifyJwt = async (token) => {
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check user was deleted after the token was issued
  const currentUser = await userRepository.findById(decoded.id);
  if (!currentUser) {
    throw new AppError(
      "The user belonging to this token does no longer exist.",
      401,
    );
  }

  // check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    throw new AppError(
      "User recently changed password! Please log in again.",
      401,
    );
  }

  return currentUser;
};

export const forgotPassword = async (email, protocol) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AppError("There is no user with that email address.", 404);
  }

  const resetToken = user.createPasswordResetToken();
  await userRepository.save(user, { validateBeforeSave: false });

  try {
    const resetURL = `${protocol}://localhost:5173/auth/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await userRepository.save(user, { validateBeforeSave: false });

    throw new AppError(
      "There was an error sending the email. Try again later!",
      500,
    );
  }
};

export const resetPassword = async (token, password, passwordConfirm) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await userRepository.findByResetToken(hashedToken);
  if (!user) {
    throw new AppError("Token is invalid or has expired.", 400);
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await userRepository.save(user);

  return createTokenPayload(user);
};

export const verifyEmail = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await userRepository.findByVerificationToken(hashedToken);
  if (!user) {
    throw new AppError("Token is invalid or has expired.", 400);
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  await userRepository.save(user, { validateBeforeSave: false });
};

export const resendVerificationEmail = async (email, protocol) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AppError("There is no user with that email address.", 404);
  }

  if (user.emailVerified) {
    throw new AppError("Email is already verified.", 400);
  }

  await sendVerificationEmail(user, protocol);
};
