import api from "../../../services/api";

export const updateAccount = async (formData) => {
  const response = await api.patch("/users/updateMe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await api.patch("/users/updateMyPassword", passwordData);
  return response.data;
};
