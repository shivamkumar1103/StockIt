import * as authService from "../services/authService.js";
import AppError from "../utils/appError.js";

export const signup = async (req, res) => {
  const { email, name, password, passwordConfirm } = req.body;
  await authService.signup(
    { email, name, password, passwordConfirm },
    req.protocol,
  );

  res.status(201).json({
    status: "success",
    message:
      "User created successfully. Please check your email to verify your account.",
  });
};

export const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const { token, cookieOptions, user } = await authService.login(
    req.body.email,
    req.body.password,
  );

  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    status: "success",
    data: user,
  });
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

  const currentUser = await authService.verifyJwt(token);
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

export const forgotPassword = async (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError("Please provide your email address.", 400));
  }

  await authService.forgotPassword(req.body.email, req.protocol);

  res.status(200).json({
    status: "success",
    message: "Token sent to email!",
  });
};

export const resetPassword = async (req, res) => {
  const { token, cookieOptions, user } = await authService.resetPassword(
    req.params.token,
    req.body.password,
    req.body.passwordConfirm,
  );

  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    status: "success",
    data: user,
  });
};

export const verifyEmail = async (req, res) => {
  await authService.verifyEmail(req.params.token);

  res.status(200).json({
    status: "success",
    message: "Email verified successfully.",
  });
};

export const resendVerificationEmail = async (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError("Please provide your email address.", 400));
  }

  await authService.resendVerificationEmail(req.body.email, req.protocol);

  res.status(200).json({
    status: "success",
    message:
      "Verification email resent successfully. Please check your email to verify your account.",
  });
};
