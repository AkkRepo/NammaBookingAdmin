import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../pages/Others/Index";

//pages
import { UsersService } from "../../services/Users";

function AddUsers(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    roleId: 1,
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const validation = () => {
    let tempError = {
      name: "",
      email: "",
      password: "",
    };
    let valid = true;
    if (!users.name) {
      tempError.name = "Name is required";
      valid = false;
    }
    if (
      !users.email ||
      !users.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      tempError.email = "Email is required or Email is not valid";
      valid = false;
    }
    if (!users.password) {
      tempError.password = "Password is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const submitUsers = () => {
    if (validation()) {
      addUsers();
    }
  };

  const addUsers = async () => {
    setLoading(true);
    try {
      console.log();
      const res = await UsersService.addUsers(users);
      if (res.status === 200) {
        alert(res.data.message);
        setUsers({ name: "", email: "", password: "", roleId: 1 }); // Clear the form
        //setError({ name: "", email: "", password:"", roleId: 1 }); // Clear errors
        props.onHide();
        props.onClose();
        navigate("/users");
      } else {
        alert("Error while Adding");
      }
      setLoading(false);
    } catch (error) {
      alert("Error while registration");
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Users
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <FloatingLabel controlId="name" label="Name" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={users.name}
                  onChange={(e) => setUsers({ ...users, name: e.target.value })}
                  isInvalid={!!error.name}
                />
                <p className="required-field-meassage">{error.name}</p>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="addEmailId"
                label="Email Id"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Email Id"
                  value={users.email}
                  onChange={(e) =>
                    setUsers({ ...users, email: e.target.value })
                  }
                  isInvalid={!!error.email}
                />
                <p className="required-field-meassage">{error.email}</p>
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <FloatingLabel
                controlId="addPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Password"
                  value={users.password}
                  onChange={(e) =>
                    setUsers({ ...users, password: e.target.value })
                  }
                  isInvalid={!!error.password}
                />
                <p className="required-field-meassage">{error.password}</p>
              </FloatingLabel>
            </Col>
          </Row>
        </div>

        <Row style={{ paddingBottom: "1rem" }}>
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col>
            <Button onClick={submitUsers} className="custom-btn">
              {" "}
              Add{" "}
            </Button>
          </Col>
          <Col style={{ paddingRight: "2rem" }}>
            <Button onClick={props.onHide} className="custom-btn-reverse">
              Cancel
            </Button>
          </Col>
        </Row>
      </Modal>
      <LoadingModal show={loading} />
    </>
  );
}

export default AddUsers;
