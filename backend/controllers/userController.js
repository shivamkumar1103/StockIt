import * as userService from "../services/userService.js";
import AppError from "../utils/appError.js";

export const updatePassword = async (req, res, next) => {
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

  const { token, cookieOptions, user } = await userService.updatePassword(
    req.user._id,
    req.body.currentPassword,
    req.body.newPassword,
    req.body.newPasswordConfirm,
  );

  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    status: "success",
    data: user,
  });
};

export const updateUser = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updatePassword.",
        400,
      ),
    );
  }
  const updatedUser = await userService.updateUser(
    req.user._id,
    req.body,
    req.file,
  );
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
};

export const deleteUser = async (req, res) => {
  await userService.deleteUser(req.user._id);
  res.status(204).json({
    status: "success",
    data: null,
  });
};

export const getMe = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
};
