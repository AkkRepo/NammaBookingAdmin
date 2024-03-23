import React from "react";
import {
  Card,
  Container,
  Button,
  Form,
  Image,
  Row,
  Col,
} from "react-bootstrap";

//image

import logo from "../../img/NB_Logo_Icon.jpg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg ">
      <Container className="login-card-align">
        <Card style={{ width: "20rem" }}>
          <Card.Body>
            <Card.Title>
              <Image src={logo} className="login-logo-style" roundedCircle />
            </Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Link to="/ForgotPassword" style={{ textDecoration: "none" }}>
                <p style={{ fontSize: "12px", color: "grey" }}>
                  Forgot password?
                </p>
              </Link>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                  <Link to="/Dashboard">
                    <Button className="custom-btn" type="submit">
                      Login
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
