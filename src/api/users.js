import axios from "axios";

export const register = async (userData) => {
  const res = await axios.post(
    "https://jp-backend-service.onrender.com/users/register",
    userData
  );
  return res.data;
};

export const login = async (userData) => {
  try {
    const res = await axios.post(
      "https://jp-backend-service.onrender.com/users/login",
      userData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
