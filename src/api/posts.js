import axios from "axios";

export const getPosts = async () => {
  const res = await axios.get("https://jp-backend-service.onrender.com/posts");
  return res.data;
};

export const deletePost = async ({ id, token }) => {
  const res = await axios.delete(
    `https://jp-backend-service.onrender.com/posts/${id}`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};

export const likePost = async ({ id, token }) => {
  const res = await axios.post(
    `https://jp-backend-service.onrender.com/likes/${id}`,
    "",
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};

export const getLikes = async () => {
  const res = await axios.get("https://jp-backend-service.onrender.com/likes");
  return res.data;
};
