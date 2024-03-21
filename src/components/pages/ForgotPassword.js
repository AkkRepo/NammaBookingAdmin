import React from "react";
import { Card, Container, Button, Form, Image } from "react-bootstrap";

//image

import logo from "../../img/NB_Logo_Icon.jpg";

function ForgotPassword() {
  return (
    <div className="bg ">
      <Container className="login-card-align">
        <Card style={{ width: "22rem" }}>
          <Card.Body>
            <Card.Title>
              <Image
                src={logo}
                className="forgot-password-logo-style"
                roundedCircle
              />
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Forgot Password
            </Card.Subtitle>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Re-Enter Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button className="custom-btn" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ForgotPassword;
