import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

import Swal from "sweetalert2";
import { commentPost } from "../../../api/comments";

export function CommentForm({ post, user }) {
  const [comment, setComment] = useState({
    content: "",
    post: post._id,
    user: user._id,
  });

  const queryClient = useQueryClient();

  const { data: token } = useQuery("getToken", () =>
    localStorage.getItem("token")
  );

  const onChangeHandler = (e) => {
    setComment({ ...comment, content: e.target.value });
  };

  const { mutate } = useMutation(commentPost, {
    onSuccess: (data) => {
      Swal.fire("Success", data.msg, "success");
      queryClient.invalidateQueries("comments");
    },
    onError: (err) => {
      Swal.fire("Oops...", err.response.data.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate({ comment, token, id: post._id });
  };
  return (
    <Form onSubmit={onSubmitHandler}>
      <FormGroup floating>
        <Input type="textarea" name="content" onChange={onChangeHandler} />
        <Label for="content">Type something in here...</Label>
      </FormGroup>
      <Button
        color="info"
        outline
        style={{ display: "block", margin: "0 auto", width: "100%" }}
      >
        Add Comment
      </Button>
    </Form>
  );
}
