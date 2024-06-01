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
            <NavLink
              to="/dashboard/stays"
              className="nav-link"
              activeClassName="active"
            >
              Stays
            </NavLink>
            <NavDropdown title="Master data">
              <Link
                to="/dashboard/categories"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
              >
                Categories
              </Link>
              <div style={{ padding: "5px" }} />
              <Link
                to="/dashboard/locations"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
              >
                Locations
              </Link>
              <div style={{ padding: "5px" }} />
              <Link
                to="/dashboard/users"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
              >
                Users
              </Link>
              {/*<NavDropdown.Item to="/dashboard/amenities">Amenities</NavDropdown.Item>
              <NavDropdown.Item to="/dashboard/amenities">Activities</NavDropdown.Item>
              <NavDropdown.Item to="/dashboard/stays">Users</NavDropdown.Item> */}
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
