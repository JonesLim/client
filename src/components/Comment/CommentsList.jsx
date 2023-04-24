import React from "react";
import { getComments } from "../../api/comments";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import { Comment } from "./Comment";
import { ListGroup } from "reactstrap";

export function CommentsList({ postId }) {
  const { data, isLoading } = useQuery("comments", () => getComments(postId));
  if (isLoading) return <ClipLoader />;
  return (
    <>
      {data && data.length ? (
        <>
          <h6 className="ms-2">Comments :</h6>
          <ListGroup>
          {data.map((comment) =>
            comment.post === postId ? (
              <Comment key={comment._id} comment={comment} />
            ) : null
          )}
          </ListGroup>
        </>
      ) : (
        null
      )}
    </>
  );
}
