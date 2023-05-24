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
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (registerData) => {
    const res = await axios.post(
      "https://jp-backend-service.onrender.com/users/register",
      registerData
    );
    return res.data;
  };

  const { mutate, isLoading } = useMutation(handleRegister, {
    onSuccess: (data) => {
      Swal.fire({
        title: "Good job!",
        text: data.msg,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (user.password !== user.password2) {
      Swal.fire("Oops...", "Password doesn't match !", "error");
      return;
    }
    if (!user.name || !user.username || !user.password || !user.password2) {
      Swal.fire("Oops...", "Please fill in all fields !", "error");
      return;
    }
    mutate(user);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15vh",
      }}
    >
      <Container
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "20px",
          borderRadius: "10px",
          border: "5px solid black",
        }}
      >
        {" "}
        <Row>
          <Col md={{ offset: 3, size: 6 }} sm="12" className="py-5">
            <h1 className="text-center">
              <span className="text-primary" style={{ fontWeight: "bold" }}>
                Registration
              </span>
            </h1>
            <Form onSubmit={onSubmitHandler} className="text-center">
              {/* {JSON.stringify(user)} */}
              <FormGroup floating>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={onChangeHandler}
                  style={{ backgroundColor: "rgba(128, 128, 128, 0.7)" }}
                />
                <Label>Full Name As Per IC</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={onChangeHandler}
                  style={{ backgroundColor: "rgba(128, 128, 128, 0.7)" }}
                />
                <Label>Username</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChangeHandler}
                  style={{ backgroundColor: "rgba(128, 128, 128, 0.7)" }}
                />
                <Label>Password</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  type="password"
                  name="password2"
                  placeholder="Password"
                  onChange={onChangeHandler}
                  style={{ backgroundColor: "rgba(128, 128, 128, 0.7)" }}
                />
                <Label>Confirm Password</Label>
              </FormGroup>
              <Button color="primary">
                {isLoading ? <BeatLoader color="#36d7b7" /> : "Register"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
