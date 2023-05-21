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
      "http://localhost:1314/posts/" + post._id,
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
          name="company"
          id="company"
          placeholder="Company"
          value={updatePost.company}
          onChange={onChangeHandler}
        />
        <Label for="company">Company</Label>
      </FormGroup>
      <FormGroup floating>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={updatePost.title}
          onChange={onChangeHandler}
        />
        <Label for="title">Position Title</Label>
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
        <Label for="content">Description</Label>
      </FormGroup>
      <FormGroup floating>
        <Input
          type="text"
          name="mail"
          id="mail"
          placeholder="Mail"
          value={updatePost.mail}
          onChange={onChangeHandler}
        />
        <Label for="mail">Mail</Label>
      </FormGroup>
      <FormGroup floating>
        <Input
          type="number"
          name="salary"
          id="salary"
          placeholder="Salary"
          value={updatePost.salary}
          onChange={onChangeHandler}
        />
        <Label for="salary">Salary</Label>
      </FormGroup>

      <div className="d-flex justify-content-between">
        <Button
          className="me-2"
          color="secondary"
          type="button"
          onClick={() => setEditing(false)}
          size="lg"
          style={{ width: "150px" }}
        >
          Cancel
        </Button>
        <Button color="success" size="lg" style={{ width: "150px" }}>
          Confirm
        </Button>
      </div>
    </Form>
  );
}
