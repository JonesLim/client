import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export function EditForm({ setEditing, post, token }) {
  const [updatePost, setUpdatePost] = useState(post);

  const onChangeHandler = (e) => {
    setUpdatePost({ ...updatePost, [e.target.name]: e.target.value });
  };

  const updatePostHandler = async (updatepost) => {
    const res = await axios.put(
      "http://localhost:7000/posts/" + post._id,
      updatepost,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    return res.data;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation(updatePostHandler, {
    onSuccess: (data) => {
      Swal.fire("Success", data.msg, "success");
      queryClient.invalidateQueries("posts");
      setEditing(false);
    },
    onError: (err) => {
      Swal.fire("Oops", err.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate(updatePost);
  };
  return (
    <Form onSubmit={onSubmitHandler}>
      <FormGroup floating>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={updatePost.title}
          onChange={onChangeHandler}
        />
        <Label for="title">Title</Label>
      </FormGroup>
      <FormGroup floating>
        <Input
          type="text"
          name="content"
          id="content"
          placeholder="Content"
          value={updatePost.content}
          onChange={onChangeHandler}
        />
        <Label for="content">Content</Label>
      </FormGroup>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          color="secondary"
          type="button"
          onClick={() => setEditing(false)}
        >
          Cancel
        </Button>
        <Button color="success">Confirm</Button>
      </div>
    </Form>
  );
}
