import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UsersService } from "../../services/Users";
import { ModalHeader } from "reactstrap";

function EditUsersCopy(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: undefined,
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
    if (!user.name) {
      tempError.name = "Name is required";
      valid = false;
    }
    if (!user.email) {
      tempError.email = "Email is required";
      valid = false;
    }
    if (!user.password) {
      tempError.password = "Password is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };
  const update = async () => {
    if (validation()) {
      try {
        const res = await UsersService.updateUsers(user);
        if (res.status === 200) {
          alert("User Updated");
          navigate("/users" + id);
        } else {
          alert("Error while uplading");
        }
      } catch (error) {
        alert("Error while uplading");
      }
    }
  };
  const getUserDetails = async () => {
    try {
      const res = await UsersService.geUsersById(id);
      if (res.status === 200) {
        const d = res.data;
        setUser({
          id: d.id,
          name: d.name,
          email: d.email,
          password: d.password,
        });
      } else {
        alert("getUserDetails if else issue");
      }
    } catch (error) {
      alert("getUserDetails catch error");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [id]);

  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="custom-icon"
        onClick={handleShow}
        id={props.id}
      />

      <Modal show={show} onHide={handleClose}>
        <div style={{ paddingTop: "10rem" }}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <div style={{ padding: "1rem" }}>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="updateName"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    isInvalid={!!error.name}
                  />
                  <p>{error.name}</p>
                </FloatingLabel>
              </Col>
            </Row>

            <Row>
              <Col>
                <FloatingLabel
                  controlId="updateEmailId"
                  label="Email Id"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email Id"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    isInvalid={!!error.email}
                  />
                  <p>{error.email}</p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="updatePassword"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    isInvalid={!!error.password}
                  />
                  <p>{error.password}</p>
                </FloatingLabel>
              </Col>
            </Row>
          </div>
          <Modal.Footer>
            <Row>
              <Col>
                <Button onClick={update} className="custom-btn">
                  {" "}
                  Update{" "}
                </Button>
              </Col>
              <Col>
                <Button onClick={props.onHide} className="custom-btn">
                  Cancel
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default EditUsersCopy;
