import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/Auth";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
      const res = await AuthService.login(user.email, user.password);
      if (res.status === 200) {
        AuthService.setUser(res.data);
        navigate("/dashboard");
      } else {
      }
    } catch (error) {
      alert(error.message);
    }
  };
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
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </Form.Group>
              <Link to="/forgotPassword" style={{ textDecoration: "none" }}>
                <p style={{ fontSize: "12px", color: "grey" }}>
                  Forgot password?
                </p>
              </Link>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                  <Link to="/dashboard">
                    <Button
                      className="custom-btn"
                      type="button"
                      onClick={onLogin}
                    >
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
