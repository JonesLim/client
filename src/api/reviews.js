import axios from "axios";

export const getReviews = async () => {
  const res = await axios.get(`http://localhost:8899/reviews`);
  return res.data;
};

export const reviewPost = async ({ review, token, id }) => {
  const res = await axios.post(`http://localhost:8899/reviews/${id}`, review, {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};

export const deleteReview = async ({ id, token }) => {
  const res = await axios.delete(`http://localhost:8899/reviews/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};

export const updateReview = async ({ id, content, token }) => {
  const res = await axios.put(
    `http://localhost:8899/reviews/${id}`,
    { content },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};
