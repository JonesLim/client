import axios from "axios";

export const getComments = async () => {
  const res = await axios.get(`http://localhost:1314/comments`);
  return res.data;
};

export const commentPost = async ({ comment, token, id }) => {
  const res = await axios.post(
    `http://localhost:1314/comments/${id}`,
    comment,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};

export const deleteComment = async ({ id, token }) => {
  const res = await axios.delete(`http://localhost:1314/comments/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};

export const updateComment = async ({ id, content, token }) => {
  const res = await axios.put(
    `http://localhost:1314/comments/${id}`,
    { content },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};
