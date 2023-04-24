import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

function Topnav() {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery("getToken", () => localStorage.getItem("token"));
  const queryClient = useQueryClient();

  const redirect = useNavigate();

  const logout = () => {
    // Swal.fire("Logout", "", "success"); // this is optional if you want to use sweetalert2
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Your account has been logged out successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    localStorage.removeItem("token");
    queryClient.invalidateQueries("getToken");
    redirect("/login");
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/" className="me-auto">
        BLOG
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="me-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          {!data ? (
            <>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <Button color="warning" onClick={logout}>
                  Logout
                </Button>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Topnav;
