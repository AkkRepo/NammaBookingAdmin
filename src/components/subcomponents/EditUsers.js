import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

//css
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
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

//pages
import AppNav from "../header/AppNav";
import AddUsers from "../subcomponents/AddUsers";
import DeleteUsers from "../subcomponents/DeleteUsers";
import { UsersService } from "../../services/Users";
import EditUsersCopy from "../subcomponents/EditUsersCopy";
import { useNavigate, useParams } from "react-router-dom";

function EditUsersModal(props) {
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
          navigate("/dashboard/users/" + id);
        } else {
          alert("Else Error");
        }
      } catch (error) {
        alert("Catch");
      }
    }
  };
  const getUserDetails = async () => {
    try {
      const res = await UsersService.geUsersById(Number(id));
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

  {
    /* */
  }
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Row>
          <Col>
            <Button onClick={update} className="custom-btn">
              Update
            </Button>
          </Col>
          <Col>
            <Button onClick={props.onHide} className="custom-btn">
              Cancel
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}

function EditUsers() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <EditUsersModal show={modalShow} onHide={() => setModalShow(false)} />
      {/*<Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
    </>
  );
}

export default EditUsers;
