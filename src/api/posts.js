import axios from "axios";

export const getPosts = async () => {
  const res = await axios.get("http://localhost:8899/posts");
  return res.data;
};

export const deletePost = async ({ id, token }) => {
  const res = await axios.delete(`http://localhost:8899/posts/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};

export const likePost = async ({ id, token }) => {
  const res = await axios.post(`http://localhost:8899/likes/${id}`, "", {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};

export const getLikes = async () => {
  const res = await axios.get("http://localhost:8899/likes");
  return res.data;
};
