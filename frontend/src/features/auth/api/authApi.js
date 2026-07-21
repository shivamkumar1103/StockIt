import api from "../../../services/api";

export const signup = async (userData) => {
  const response = await api.post("/users/signup", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/users/login", userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/users/forgotPassword", { email });
  return response.data;
};

export const resetPassword = async (token, password, passwordConfirm) => {
  const response = await api.patch(`/users/resetPassword/${token}`, {
    password,
    passwordConfirm,
  });
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await api.get(`/users/verifyEmail/${token}`);
  return response.data;
};

export const resendVerificationEmail = async (email) => {
  const response = await api.post("/users/resendVerificationEmail", { email });
  return response.data;
};

export const getUser = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
