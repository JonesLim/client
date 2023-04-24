import React, { useState } from "react";
import { ListGroupItem, Button } from "reactstrap";
import { getToken } from "../../utils/helpers";
import jwt_decode from "jwt-decode";
import { EditCommentForm } from "../forms/CommentForm/EditCommentForm";
import { useMutation, useQueryClient } from "react-query";
import { deleteComment } from "../../api/comments";
import Swal from "sweetalert2";
import { ScaleLoader } from "react-spinners";

export function Comment({ comment }) {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  const token = getToken();
  const decoded = token ? jwt_decode(token) : null;

  const deleteConfirmationMessage =
    "Are you sure you want to delete this comment? This action cannot be undone.";

  const { mutate, isLoading } = useMutation(deleteComment, {
    onSuccess: (data) => {
      Swal.fire("Deleted!", data.msg, "success");
      queryClient.invalidateQueries("comments");
    },
    onError: (err) => {
      Swal.fire("Oops...", err.response.data.msg, "error");
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: deleteConfirmationMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let id = comment._id;
        mutate({ id, token });
      }
    });
  };

  if (!decoded) {
    return null; // or some other fallback UI, e.g. a message to log in or reload the page
  }

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      {editing ? (
        <EditCommentForm
          comment={comment}
          token={token}
          setEditing={setEditing}
        />
      ) : (
        <p className="mb-0">{comment.content}</p>
      )}
      {comment.user === decoded.data._id ? (
        <div className={editing ? "d-none" : "d-flex align-items-center"}>
          <Button
            color="warning"
            className="btn-sm py-0 me-2"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
          <Button
            color="danger"
            className="btn-sm py-0"
            onClick={handleDelete}
          >
            {isLoading ? <ScaleLoader color="#fff" size={12} /> : "Delete"}
          </Button>
        </div>
      ) : null}
    </ListGroupItem>
  );
}
