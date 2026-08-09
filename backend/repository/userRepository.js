import User from "../models/UserModel.js";

export const create = async (userData) => {
  return await User.create(userData);
};

export const findByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findByEmailWithPassword = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const findById = async (id) => {
  return await User.findById(id);
};

export const findByIdWithPassword = async (id) => {
  return await User.findOne({ _id: id }).select("+password");
};

export const findByResetToken = async (hashedToken) => {
  return await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
};

export const findByVerificationToken = async (hashedToken) => {
  return await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });
};

export const deleteById = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const save = async (user, options = {}) => {
  return await user.save(options);
};
