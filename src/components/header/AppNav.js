import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";

import "../../css/style.css";
import logo from "../../img/NB_Logo_Cropped.jpg";

const AppNav = () => {
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
              to="/Dashboard"
              className="nav-link"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
            <NavLink to="/Stays" className="nav-link" activeClassName="active">
              Stays
            </NavLink>
            <NavDropdown title="Master data">
              <Link
                to="/Amenities"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
              >
                Amenities
              </Link>
              <div style={{ padding: "5px" }} />
              <Link
                to="/Activities"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
              >
                Activities
              </Link>
              <div style={{ padding: "5px" }} />
              <Link
                to="/Users"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
              >
                Users
              </Link>
              {/*<NavDropdown.Item to="/Amenities">Amenities</NavDropdown.Item>
              <NavDropdown.Item to="/Amenities">Activities</NavDropdown.Item>
              <NavDropdown.Item to="/Stays">Users</NavDropdown.Item> */}
            </NavDropdown>
            <NavLink
              to="/Dashboard"
              className="nav-link"
              activeClassName="active"
            >
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNav;
