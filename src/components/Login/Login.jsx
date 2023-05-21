import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useQueryClient } from "react-query";

export function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (logindata) => {
    const res = await axios.post(
      "http://localhost:1314/users/login",
      logindata
    );
    return res.data;
  };

  const redirect = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
      Swal.fire("Oops...", `Please fill up all the fields !`, "error");
      return;
    }
    mutate(user);
  };

  const { mutate, isLoading } = useMutation(handleLogin, {
    onSuccess: (data) => {
      Swal.fire({
        title: "Great !",
        text: "Successfully login !",
        icon: "success",
        timer: 1000, // Auto-close timer in milliseconds
        showConfirmButton: false,
      });
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", data);
        queryClient.setQueryData("getToken", data);
      }
      redirect("/");
    },
    onError: (err) => {
      Swal.fire("Oops...", err.response.data.msg, "error");
    },
  });

  return (
    <Container>
      <Row>
        <Col md={{ offset: 3, size: 6 }} sm="12" className="py-5">
          <h1 className="mb-4 text-center">
            <span className="text-primary" style={{ fontWeight: "bold" }}>
              Login
            </span>
          </h1>
          <Form onSubmit={onSubmitHandler} className="text-center">
            <FormGroup floating>
              <Input
                onChange={onChangeHandler}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                style={{ backgroundColor: "rgba(128, 128, 128, 0.7)" }}
              />
              <Label for="username">Username</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                onChange={onChangeHandler}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                style={{ backgroundColor: "rgba(128, 128, 128, 0.7)" }}
              />
              <Label for="password">Password</Label>
            </FormGroup>
            <Button color="primary">
              {isLoading ? <ClipLoader color="#36d7b7" size={12} /> : "Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
