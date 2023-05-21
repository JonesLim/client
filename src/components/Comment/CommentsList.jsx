import React, { useState } from "react";
import { getComments } from "../../api/comments";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import { Comment } from "./Comment";
import { ListGroup, Button } from "reactstrap";

export function CommentsList({ postId }) {
  const { data, isLoading } = useQuery("comments", () => getComments(postId));
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  if (isLoading) return <ClipLoader />;

  return (
    <>
      <Button
        color="primary"
        onClick={toggleComments}
        className="mb-3"
        style={{ display: "block", margin: "0 auto", width: "100%" }}
      >
        All Comments
      </Button>
      {showComments && (
        <>
          {data && data.length ? (
            <>
              <ListGroup>
                {/* display the username who commented on the post */}
                {data
                  .filter((comment) => comment.post === postId)
                  .reverse()
                  .map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                  ))}
              </ListGroup>
            </>
          ) : null}
        </>
      )}
    </>
  );
}
