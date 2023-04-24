import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Form, Input, Button, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import { updateComment } from "../../../api/comments";
import { ScaleLoader } from "react-spinners";

export function EditCommentForm({ comment, token, setEditing }) {
  const { _id, content } = comment;

  const [updatedComment, setUpdatedComment] = useState(content);
  const onChangeHandler = (e) => {
    setUpdatedComment(e.target.value);
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateComment, {
    onSuccess: (data) => {
      Swal.fire("Successful", data.msg, "success");
      queryClient.invalidateQueries("comments");
      setEditing(false);
    },
    onError: (err) => {
      Swal.fire("Oops...", err?.response?.data?.msg || "Something went wrong", "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (updatedComment.length < 1) {
      Swal.fire("Oops...", "This field must not be empty!", "error");
    } else {
      mutate({ id: _id, content: updatedComment, token });
    }
  };

  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        <FormGroup className="d-flex">
          <Input type="textarea" name="content" placeholder="content" onChange={onChangeHandler} value={updatedComment} />
          <Button className="ms-2" disabled={isLoading}>
            {isLoading ? <ScaleLoader color="#36d7b7"  /> : "Save"}
          </Button>
        </FormGroup>
      </Form>
    </>
  );
}
