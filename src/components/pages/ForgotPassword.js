import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card, Container, Button, Form, Image } from "react-bootstrap";
import { AuthService } from "../../services/Auth";
//image

import logo from "../../img/NB_Logo_Icon.jpg";

function ForgotPassword() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    rePassword: "",
  });
  const [loading, setLoading] = useState(false);
  const isValid = () => {
    let temp = { email: "", password: "" };
    let flag = true;
    if (
      !user.email ||
      !user.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      temp.email = "Required or Invalid Email";
      flag = false;
    }
    if (!user.password) {
      temp.password = "Required Field";
      flag = false;
    }
    if (!user.rePassword) {
      temp.rePassword = "Required Field";
      flag = false;
    }
    if (!(user.rePassword === user.password)) {
      temp.password = "Passwords not matching";
      flag = false;
    }
    setError(temp);
    return flag;
  };
  const resetPassword = async () => {
    if (isValid()) {
      setLoading(true);
      try {
        const res = await AuthService.resetPassword(user.email, user.password);
        if (res.status === 200) {
          AuthService.setUser(res.data);
          alert("Password reset successful");
          navigate("/login");
        } else if (res.status === 400) {
          alert(res.data.error.message);
        } else {
          alert("Unable to reset password");
        }
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    }
  };
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
                <Form.Control
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="email"
                  isInvalid={!!error.email}
                  placeholder="Email"
                />
                {error.email && (
                  <p className="required-field-meassage">{error.email}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.code === "Enter") resetPassword();
                  }}
                  type="password"
                  isInvalid={!!error.password}
                />
                {error.password && (
                  <p className="required-field-meassage">{error.password}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Re-Enter Password</Form.Label>
                <Form.Control
                  name="password"
                  placeholder="Password"
                  value={user.rePassword}
                  onChange={(e) =>
                    setUser({ ...user, rePassword: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.code === "Enter") resetPassword();
                  }}
                  type="password"
                  isInvalid={!!error.rePassword}
                />
                {error.password && (
                  <p className="required-field-meassage">{error.rePassword}</p>
                )}
              </Form.Group>
              <Button className="custom-btn" onClick={resetPassword}>
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
