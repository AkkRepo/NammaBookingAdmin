import { useState, useEffect } from "react";
import { Modal, Button, Form, FloatingLabel, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { UsersService } from "../../services/Users";

function TestingFile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(getUsersDetails());

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
    if (!user.password) {
      tempError.password = "Password is required";
      valid = false;
    }
    if (!user.email) {
      tempError.email = "Email is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const register = async () => {
    if (validation()) {
      try {
        const res = await UsersService.updateUsers(user);
        if (res.status === 200) {
          alert("User Updated");
          navigate("/dashboard/users/" + id);
        } else {
          alert("Error: " + res.status);
        }
      } catch (error) {
        console.error("Register error:", error);
        alert("Catch error: " + error.message);
      }
    }
  };

  const getUsersDetails = async () => {
    try {
      const res = await UsersService.getUsersById(Number(id)); // Correct the method name if needed
      if (res.status === 200) {
        const d = res.data;
        setUser({
          id: d.id,
          name: d.name,
          email: d.email,
          password: d.password,
        });
      } else {
        alert("getUsersDetails error: " + res.status);
      }
    } catch (error) {
      console.error("getUsersDetails error:", error);
      alert("getUsersDetails catch error: " + error.message);
    }
  };

  {
    /*useEffect(() => {
    getUsersDetails();
  }, []);
 */
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <div>
        <Modal show={show} onHide={handleClose} style={{ paddingTop: "12rem" }}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={register}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default TestingFile;
