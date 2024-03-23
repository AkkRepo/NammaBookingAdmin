import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Image } from "react-bootstrap";

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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNav;
