import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Image,
  NavDropdown,
  Button,
} from "react-bootstrap";

import "../../css/style.css";
import logo from "../../img/NB_Logo_Cropped.jpg";
import { AuthService } from "../../services/Auth";

const AppNav = () => {
  const navigate = useNavigate();
  const logout = () => {
    AuthService.logout();
    navigate("/login");
  };
  const highlight = () => {
    const path = window.location.pathname;
    return (
      path.includes("locations") ||
      path.includes("categories") ||
      path.includes("users") ||
      path.includes("bedType")
    );
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="nav-link">
          <img src={logo} className="image-style" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/dashboard"
              className="nav-link"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
            <NavLink to="/stays" className="nav-link" activeClassName="active">
              Stays
            </NavLink>
            <NavLink
              to="/testimonies"
              className="nav-link"
              activeClassName="active"
            >
              Testimonies
            </NavLink>
            <NavDropdown
              title="Master data"
              activeClassName="active"
              className={highlight() ? "active" : ""}
            >
              <Link
                to="/categories"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
                activeClassName="active"
                className={
                  window.location.pathname.includes("categories")
                    ? "active"
                    : ""
                }
              >
                Categories
              </Link>
              <div style={{ padding: "5px" }} />
              <Link
                to="/locations"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
                className={
                  window.location.pathname.includes("locations") ? "active" : ""
                }
              >
                Locations
              </Link>
              <div style={{ padding: "5px" }} />
              <Link
                to="/users"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
                className={
                  window.location.pathname.includes("users") ? "active" : ""
                }
              >
                Users
              </Link>{" "}
              <div style={{ padding: "5px" }} />
              <Link
                to="/bedType"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
                className={
                  window.location.pathname.includes("bedType") ? "active" : ""
                }
              >
                Bed type
              </Link>
            </NavDropdown>
            <Button
              className="nav-link"
              activeClassName="active"
              onClick={logout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNav;
