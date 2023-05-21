import React, { useState } from "react";
import { Container, Button, Input } from "reactstrap";
import { useQuery } from "react-query";
import { PacmanLoader } from "react-spinners";
import Post from "./Post";
import { getPosts } from "../../api/posts";

export function PostsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useQuery("posts", getPosts);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(data.length / postsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredPosts = data?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = filteredPosts?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts?.slice(indexOfFirstPost, indexOfLastPost);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <PacmanLoader color="#0d6efd" />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching posts</div>;
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4 py-5">
        <Input
          type="text"
          placeholder="Search by Job Position"
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{ border: "5px solid black", borderRadius: "20px", padding: "5px" }}

        />
      </div>
      {currentPosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      <div className="d-flex justify-content-between mt-4">
        <Button
          color="primary"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          style={{ width: "100px", border: "5px solid black", borderRadius: "20px" }}
        >
          Previous
        </Button>
        <div
          style={{ color: "blueviolet", fontWeight: "bold", fontSize: "30px" }}
        >
          {currentPage} of {Math.ceil(sortedPosts.length / postsPerPage)}
        </div>
        <Button
          color="primary"
          onClick={handleNextClick}
          disabled={
            currentPage === Math.ceil(sortedPosts.length / postsPerPage)
          }
          style={{ width: "100px", border: "5px solid black", borderRadius: "20px" }}
        >
          Next
        </Button>
      </div>
      <div className="mt-4 text-center">
        {Array.from(
          { length: Math.ceil(sortedPosts.length / postsPerPage) },
          (_, index) => {
            const pageNumber = index + 1;
            const startPage = currentPage > 2 ? currentPage - 1 : 1;
            const endPage =
              startPage + 2 <= Math.ceil(sortedPosts.length / postsPerPage)
                ? startPage + 2
                : Math.ceil(sortedPosts.length / postsPerPage);

            if (pageNumber >= startPage && pageNumber <= endPage) {
              return (
                <Button
                  style={{ width: "200px", border: "5px solid black", borderRadius: "10px" }}
                  key={index}
                  color={currentPage === pageNumber ? "primary" : "secondary"}
                  onClick={() => handlePageClick(pageNumber)}
                  className="mx-1"
                >
                  {pageNumber}
                </Button>
              );
            }

            return null;
          }
        )}
      </div>
    </Container>
  );
}
