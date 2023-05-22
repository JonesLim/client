import axios from "axios";

export const register = async (userData) => {
  const res = await axios.post(
    "http://localhost:8899/users/register",
    userData
  );
  return res.data;
};

export const login = async (userData) => {
  try {
    const res = await axios.post("http://localhost:8899/users/login", userData);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
