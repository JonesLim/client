import React from "react";
import { Routes, Route } from "react-router-dom";
import Topnav from "./components/Navbar";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { PostsList } from "./components/PostsList";
import { AddForm } from "./components/forms/AddForm";
import { useQuery } from "react-query";

function App() {
  const { data: token } = useQuery("getToken", () =>
    localStorage.getItem("token")
  );
  return (
    <>
      <Topnav />
      {token ? <AddForm /> : null}
      <Routes>
        <Route />
        <Route path="/" element={<PostsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
