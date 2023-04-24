import axios from "axios";

export const getPosts = async () => {
  const res = await axios.get("http://localhost:7000/posts");
  return res.data;
};

export const deletePost = async ({ id, token }) => {
  const res = await axios.delete(`http://localhost:7000/posts/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};

export const likePost = async ({ id, token }) => {
  const res = await axios.post(`http://localhost:7000/likes/${id}`, "", {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};
