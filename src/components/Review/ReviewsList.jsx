import React, { useState } from "react";
import { getReviews } from "../../api/reviews";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import { Review } from "./Review";
import { ListGroup, Button } from "reactstrap";

export function ReviewsList({ postId }) {
  const { data, isLoading } = useQuery("reviews", () => getReviews(postId));
  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews((prevShowReviews) => !prevShowReviews);
  };

  if (isLoading) return <ClipLoader />;

  return (
    <>
      <Button
        color="primary"
        onClick={toggleReviews}
        className="mb-3"
        style={{ display: "block", margin: "0 auto", width: "100%" }}
      >
        All Reviews
      </Button>
      {showReviews && (
        <>
          {data && data.length ? (
            <>
              <ListGroup>
                {data
                  .filter((review) => review.post === postId)
                  .reverse()
                  .map((review) => (
                    <Review key={review._id} review={review} />
                  ))}
              </ListGroup>
            </>
          ) : null}
        </>
      )}
    </>
  );
}
