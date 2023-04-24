import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Button,
} from "reactstrap";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import { EditForm } from "../forms/EditForm";
import { CommentForm } from "../forms/CommentForm";
import { getToken } from "../../utils/helpers";
import { deletePost, likePost } from "../../api/posts";
import { CommentsList } from "../Comment";

export default function Post({ post }) {
  const [editing, setEditing] = useState(false);

  const queryClient = useQueryClient();
  const token = getToken();
  const decoded = token ? jwt_decode(token) : null;

  const { mutate, isLoading } = useMutation(deletePost, {
    onSuccess: (data) => {
      Swal.fire("Deleted!", data.msg, "success");
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate({ id, token });
      }
    });
  };

  const { mutate: likeMutate } = useMutation(likePost, {
    onSuccess: (data) => {
      Swal.fire(checkLiked ? "Unlike !" : "Like !", data.msg, "success");
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const likeHandler = (id) => {
    likeMutate({ id, token });
  };

  const checkLiked = post.likes.find(
    ({ like }) => like.user === decoded.data._id
  );

  // create a function to like and unlike the post by the user who is logged in and update the likes array in the post

  return (
    <Card>
      <CardBody>
        {editing ? (
          <EditForm setEditing={setEditing} post={post} token={token} />
        ) : (
          <>
            <CardTitle tag="h5" className="card-title">
              {post.title}
            </CardTitle>
            <CardSubtitle className="mb-2 text-primary" tag="h6">
              User: {post.user.name}
            </CardSubtitle>
            <CardText>{post.content}</CardText>
            <div>
              <span className="badge bg-secondary">
                {post.likes.length} likes
              </span>
              <Button
                color="primary btn-sm ms-1"
                onClick={() => likeHandler(post._id)}
              >
                {checkLiked ? "Unlike" : "Like"}
                {/* Like */}
              </Button>
            </div>
          </>
        )}
      </CardBody>
      {token && post.user._id === decoded.data._id ? (
        <CardFooter className="d-flex justify-content-between">
          <div>
            <Button color="warning" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button color="danger" onClick={() => deleteHandler(post._id)}>
              {isLoading ? <ClipLoader color="#36d7b7" size={12} /> : "Delete"}
            </Button>
          </div>
        </CardFooter>
      ) : null}

      {token ? <CommentForm post={post} user={decoded.data} /> : null}
      <CommentsList postId={post._id} />
    </Card>
  );
}
