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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function Topnav() {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery("getToken", () => localStorage.getItem("token"));
  const queryClient = useQueryClient();

  const redirect = useNavigate();

  const logout = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your account has been logged out successfully !",
      showConfirmButton: false,
      timer: 1000,
    });

    localStorage.removeItem("token");
    queryClient.invalidateQueries("getToken");
    redirect("/login");
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      color="dark"
      dark
      expand="md"
      style={{
        borderRadius: "50px",
        marginLeft: "20px",
        marginRight: "20px",
        bottom: "20px",
        top: "20px",
        position: "relative",
        border: "5px solid black",
      }}
    >
      <NavbarBrand
        href="/"
        className="me-auto ms-2"
        style={{
          fontWeight: "bold",
          backgroundImage: "linear-gradient(to left, #30cfd0 0%, #330867 100%)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: "0px 0px 10px #fff, 0px 0px 0px #30cfd0",
        }}
      >
        Online Job Portal
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="me-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink href="/">
              <FontAwesomeIcon icon={faHome} className="me-1" size="lg" />
            </NavLink>
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
                <Button
                  color="secondary"
                  style={{ borderRadius: "30px", border: "none" }}
                  outline
                  onClick={logout}
                >
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
