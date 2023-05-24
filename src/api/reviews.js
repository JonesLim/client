import axios from "axios";

export const getReviews = async () => {
  const res = await axios.get(
    `https://jp-backend-service.onrender.com/reviews`
  );
  return res.data;
};

export const reviewPost = async ({ review, token, id }) => {
  const res = await axios.post(
    `https://jp-backend-service.onrender.com/reviews/${id}`,
    review,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};

export const deleteReview = async ({ id, token }) => {
  const res = await axios.delete(
    `https://jp-backend-service.onrender.com/reviews/${id}`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};

export const updateReview = async ({ id, content, token }) => {
  const res = await axios.put(
    `https://jp-backend-service.onrender.com/reviews/${id}`,
    { content },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};
