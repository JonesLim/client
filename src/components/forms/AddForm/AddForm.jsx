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
import { faBars, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function AddForm() {
  const queryClient = useQueryClient();
  const { data: token } = useQuery("getToken", () =>
    localStorage.getItem("token")
  );
  let decoded = jwt_decode(token);

  const [showForm, setShowForm] = useState(false); // add state to show/hide form

  const [post, setPost] = useState({
    company: "",
    title: "",
    content: "",
    mail: "",
    salary: "",
    user: decoded.data._id,
  });

  const handlePost = async (postData) => {
    const res = await axios.post(
      "https://jp-backend-service.onrender.com/posts",
      postData,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    return res.data;
  };
  const { mutate, isLoading } = useMutation(handlePost, {
    onSuccess: (data) => {
      Swal.fire({
        title: "Success",
        text: data.msg,
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        toggleForm(); // Close the form after the success message
      });
      queryClient.invalidateQueries("posts");
    },
    onError: (err) => {
      Swal.fire("Oops...", err.response.data.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !post.company ||
      !post.title ||
      !post.content ||
      !post.mail ||
      !post.salary
    ) {
      Swal.fire("Oops...", "All fields are required !", "error");
      return;
    }
    if (token) {
      mutate(post);
    }
    e.target.reset();
    setPost({
      company: "",
      title: "",
      content: "",
      mail: "",
      salary: "",
      ...post,
    });
  };

  const onChangeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const toggleForm = () => setShowForm(!showForm); // add function to toggle form

  //check if user is an admin or not
  //req.user.isAdmin is coming from backend
  const isAdmin = decoded.data.isAdmin;

  return (
    <Container className="text-center">
      <Row>
        <Col md={{ offset: 3, size: 6 }} sm="12" className="py-5">
          {isAdmin ? ( // check if user is an admin
            !showForm ? (
              <Button
                color="success"
                onClick={toggleForm}
                style={{
                  borderRadius: "30px",
                  position: "absolute",
                  top: "110px",
                  right: "20px",
                  border: "5px solid black",
                }}
              >
                <div>
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ marginRight: "5px" }}
                    bounce
                  />
                  Add Job{" "}
                </div>
              </Button>
            ) : (
              <Form
                onSubmit={onSubmitHandler}
                style={{
                  border: "5px solid #ccc",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <Row>
                  <Col md="6">
                    <FormGroup floating>
                      <Input
                        onChange={onChangeHandler}
                        type="text"
                        name="company"
                        id="company"
                        placeholder="Company"
                      />
                      <Label for="company">Company</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup floating>
                      <Input
                        onChange={onChangeHandler}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                      />
                      <Label for="title">Position Title</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup floating>
                      <Input
                        onChange={onChangeHandler}
                        type="text"
                        name="content"
                        id="content"
                        placeholder="Content"
                      />
                      <Label for="content">Description</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup floating>
                      <Input
                        onChange={onChangeHandler}
                        type="text"
                        name="mail"
                        id="mail"
                        placeholder="Mail"
                      />
                      <Label for="mail">Mailing Address</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup floating>
                      <Input
                        onChange={onChangeHandler}
                        type="number"
                        name="salary"
                        id="salary"
                        placeholder="Salary"
                      />
                      <Label for="salary">Salary</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button type="submit" color="success">
                    {isLoading ? (
                      <ClipLoader
                        size={20}
                        color={"#fff"}
                        loading={isLoading}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{
                          marginRight: "20px",
                          marginLeft: "20px",
                        }}
                        beat
                      />
                    )}
                  </Button>
                  <Button onClick={toggleForm} type="button" color="danger">
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{
                        marginRight: "20px",
                        marginLeft: "20px",
                      }}
                      beat
                    />
                  </Button>
                </div>
              </Form>
            )
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
