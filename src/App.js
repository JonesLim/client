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
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://jsginc.com/wp-content/uploads/2018/10/bigstock-170353778.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Topnav />
      {token ? <AddForm /> : null}
      <Routes>
        <Route />
        <Route path="/" element={<PostsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
