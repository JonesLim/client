import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import { EditForm } from "../forms/EditForm";
import { CommentForm } from "../forms/CommentForm";
import { getToken } from "../../utils/helpers";
import { deletePost, likePost } from "../../api/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import { CommentsList } from "../Comment";

export default function Post({ post }) {
  const [editing, setEditing] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
      const successMessage = checkLiked ? "Unlike!" : "Like!";
      const messageDuration = 1000; // message duration in milliseconds

      // show success message
      Swal.fire({
        title: successMessage,
        text: data.msg,
        icon: "success",
        timer: messageDuration,
        showConfirmButton: false,
      });

      // invalidate post queries after message duration
      setTimeout(() => {
        queryClient.invalidateQueries("posts");
      }, messageDuration);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.msg || "Something went wrong";
      const messageDuration = 3000; // message duration in milliseconds

      // show error message
      Swal.fire({
        title: "Oops...",
        text: errorMessage,
        icon: "error",
        timer: messageDuration,
        showConfirmButton: false,
      });
    },
  });

  const likeHandler = (id) => {
    likeMutate({ id, token });
  };

  const checkLiked =
    decoded && post.likes.find(({ like }) => like.user === decoded.data._id);

  const [showMore, setShowMore] = useState(false);

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Container
      style={{
        backgroundColor: "lightgray",
        padding: "20px",
        borderRadius: "10px",
        border: "5px solid black",
        marginBottom: "20px",
      }}
    >
      <Row>
        <Col>
          <Container>
            {editing ? (
              <EditForm setEditing={setEditing} post={post} token={token} />
            ) : (
              <>
                {token && (
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="btn-lg ms-1"
                      onClick={() => likeHandler(post._id)}
                      style={{ border: "none", background: "transparent" }}
                    >
                      {checkLiked ? (
                        <FontAwesomeIcon
                          icon={faHeart}
                          size="2xl"
                          color="red"
                        />
                      ) : (
                        <FontAwesomeIcon icon={farHeart} size="2xl" />
                      )}
                    </Button>
                  </div>
                )}

                <h1
                  className="font-weight-bold"
                  style={{
                    fontSize: "70px",
                    color: "blue",
                  }}
                >
                  {post.company.toUpperCase()}
                </h1>
                <h1 style={{ paddingLeft: "10px", color: "#0ABAB5" }}>
                  {post.title.toUpperCase()}
                </h1>
                <hr />
                {token && (
                  <div>
                    {showMore ? (
                      <>
                        <h3
                          className="pl-1"
                          style={{
                            paddingLeft: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          Description: <br />
                          <span style={{ fontSize: "30px", fontWeight: "100" }}>
                            {post.content}
                          </span>
                        </h3>
                        <br />
                        <hr />
                        <h3
                          className=" pl-1"
                          style={{
                            paddingLeft: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          Mailing Address: <br />
                          <span style={{ fontSize: "30px", fontWeight: "100" }}>
                            {post.mail}
                          </span>
                          <br />
                          <br />
                          <br />
                          <br />
                          <div
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              fontSize: "20px",
                              textAlign: "center",
                            }}
                          >
                            <small>
                              -Kindly send your resume to the following mailing
                              address-
                            </small>
                          </div>
                        </h3>

                        <hr />

                        <h3
                          className="pl-1"
                          style={{
                            paddingLeft: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          Salary: $ <span>{post.salary}</span>
                        </h3>

                        <Button
                          style={{
                            color: "blue",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "30px",
                          }}
                          onClick={handleToggleShowMore}
                        >
                          ...Hide
                        </Button>
                      </>
                    ) : (
                      <Button
                        style={{
                          color: "blue",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "30px",
                        }}
                        onClick={handleToggleShowMore}
                      >
                        More...
                      </Button>
                    )}
                  </div>
                )}
                <div className="text-end">
                  <span className="mb-2">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              </>
            )}
          </Container>
          {token && post.user._id === decoded.data._id ? (
            <Container className="text-start">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle
                  caret
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "maroon",
                  }}
                >
                  Options
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    style={{ color: "chocolate" }}
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    style={{ color: "red" }}
                    onClick={() => deleteHandler(post._id)}
                  >
                    {isLoading ? (
                      <ClipLoader color="#36d7b7" size={12} />
                    ) : (
                      "Delete"
                    )}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Container>
          ) : null}
        </Col>
        {token && (
          <Col
            md={3}
            style={{ borderLeft: "5px solid black", paddingLeft: "20px" }}
          >
            <CommentsList postId={post._id} />
            <br />
            <CommentForm post={post} user={decoded.data} />
          </Col>
        )}
      </Row>
    </Container>
  );
}
