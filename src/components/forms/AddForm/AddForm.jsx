import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

export function AddForm() {
  const queryClient = useQueryClient();
  const { data: token } = useQuery("getToken", () =>
    localStorage.getItem("token")
  );
  let decoded = jwt_decode(token);

  const [post, setPost] = useState({
    title: "",
    content: "",
    user: decoded.data._id,
  });

  const handlePost = async (postData) => {
    const res = await axios.post("http://localhost:7000/posts", postData, {
      headers: {
        "x-auth-token": token,
      },
    });
    return res.data;
  };
  const { mutate, isLoading } = useMutation(handlePost, {
    onSuccess: (data) => {
      Swal.fire("Success", data.msg, "success");
      queryClient.invalidateQueries("posts");
    },
    onError: (err) => {
      Swal.fire("Oops...", err.response.data.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (token) {
      mutate(post);
    }
    e.target.reset();
    setPost({ title: "", content: "", ...post });
  };
  const onChangeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Row>
        <Col md={{ offset: 3, size: 6 }} sm="12" className="py-5">
          <h2>Add Post</h2>
          <Form onSubmit={onSubmitHandler}>
            <FormGroup floating>
              <Input
                onChange={onChangeHandler}
                type="text"
                name="title"
                id="title"
                placeholder="Title"
              />
              <Label for="title">Title</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                onChange={onChangeHandler}
                type="text"
                name="content"
                id="content"
                placeholder="content"
              />
              <Label for="content">Content</Label>
            </FormGroup>
            <Button color="success">
              {isLoading ? <ClipLoader color="#36d7b7" size={12} /> : "Add"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
