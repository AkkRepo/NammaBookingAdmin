import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Table,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { UsersService } from "../../services/Users";
import { LoadingModal } from "../pages/Others/Index";

function EditUsersModal({ show, onHide, user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({
    id: undefined,
    name: "",
    email: "",
    password: "",
    //roleId: 1,
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
    if (!users.email) {
      tempError.email = "Email is required";
      valid = false;
    }
    if (!users.password) {
      tempError.password = "Password is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await UsersService.updateUsers(users);
        if (res.status === 200) {
          alert(res.data.message);
          onHide();
          navigate("/users");
        } else {
          alert("Error while updating");
        }
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (show) {
      setUsers({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        //roleId: 1,
      });
    }
  }, [show]);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update users
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <FloatingLabel
                controlId="updateName"
                label="Name*"
                className="mb-3"
              >
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
          </Row>

          <Row>
            <Col>
              <FloatingLabel
                controlId="updateEmailId"
                label="Email Id*"
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
            {/*<Col>
            <FloatingLabel
              controlId="updatePassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Password"
                //value={users.password}
                onChange={(e) =>
                  setUsers({ ...users, password: e.target.value })
                }
                isInvalid={!!error.password}
              />
              <p>{error.password}</p>
            </FloatingLabel>
          </Col> */}
          </Row>
        </div>
        <hr style={{ color: "grey" }} />
        <Row style={{ paddingBottom: "1rem" }}>
          <Col style={{ paddingLeft: "2rem" }}>
            <Button onClick={update} className="custom-btn">
              Update
            </Button>
          </Col>
          <Col style={{ paddingRight: "2rem", marginLeft: "-1rem" }}>
            <Button onClick={onHide} className="custom-btn-reverse">
              Cancel
            </Button>
          </Col>
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
        </Row>
      </Modal>
      <LoadingModal show={loading} />
    </>
  );
}

function EditUsers(props) {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({
    id: undefined,
    name: "",
    email: "",
    password: "",
    //roleId: 1,
  });
  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <EditUsersModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          props.onClose();
        }}
        user={props.user}
      />
    </>
  );
}

export default EditUsers;
