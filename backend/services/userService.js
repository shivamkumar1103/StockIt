import * as userRepository from "../repository/userRepository.js";
import AppError from "../utils/appError.js";
import createTokenPayload from "../utils/createTokenPayload.js";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const updatePassword = async (
  userId,
  currentPassword,
  newPassword,
  newPasswordConfirm,
) => {
  const user = await userRepository.findByIdWithPassword(userId);

  if (!user || !(await user.correctPassword(currentPassword, user.password))) {
    throw new AppError("Your current password is incorrect.", 401);
  }

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await userRepository.save(user);

  return createTokenPayload(user);
};

export const updateUser = async (userId, updateData, file) => {
  const filteredObj = filterObj(updateData, "name");
  if (file) filteredObj.photo = file.filename;
  const updatedUser = await userRepository.findByIdAndUpdate(
    userId,
    filteredObj,
    { new: true, runValidators: true },
  );
  return updatedUser;
};

export const deleteUser = async (userId) => {
  await userRepository.findByIdAndUpdate(userId, { active: false });
};
