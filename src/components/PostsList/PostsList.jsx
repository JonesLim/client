import React from "react";
import { Container } from "reactstrap";
import { useQuery } from "react-query";
import { PacmanLoader } from "react-spinners";
import Post from "./Post";
import { getPosts } from "../../api/posts"; 

export function PostsList() {
  const { data, error, isLoading } = useQuery("posts", getPosts);

  if (isLoading) {
    return <PacmanLoader color="#36d7b7" />;
  }

  if (error) {
    return <h2>Error {error.message}</h2>;
  }
  return (
    <Container className="mt-4">
      <h2 className="mb-3">All Posts</h2>
      {data.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </Container>
  );
}
