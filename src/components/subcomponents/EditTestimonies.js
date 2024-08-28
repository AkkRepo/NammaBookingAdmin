import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { LoadingModal } from "../pages/Others/Index";
import { TestimoniesServices } from "../../services/Testimonies";

function EditTestimoniesModal({ show, onHide, testimony }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [testimonies, setTestimonies] = useState({
    id: undefined,
    name: "",
    testimony: "",
  });
  const [error, setError] = useState({
    name: "",
    testimony: "",
  });

  const validation = () => {
    let tempError = {
      name: "",
      testimony: "",
    };
    let valid = true;
    if (!testimonies.name) {
      tempError.name = "Name is required";
      valid = false;
    }
    if (!testimonies.testimony) {
      tempError.testimony = "Testimony is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async (id) => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await TestimoniesServices.updateTestimonies({
          ...testimonies,
        });
        if (res.status === 200) {
          alert(res.message);
          onHide();
          navigate("/testimonies");
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

  const getTestimonies = async (id) => {
    try {
      const res = await TestimoniesServices.getTestimoniesById(id);
      if (res.status === 200) {
        setTestimonies({
          id: res.data.id,
          name: res.data.name,
          testimony: res.data.testimony,
        });
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (show) {
      getTestimonies(testimony.id);
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
            Edit Testimony
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="editName"
            label="Edit Name*"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Edit Name*"
              value={testimonies.name}
              onChange={(e) =>
                setTestimonies({ ...testimonies, name: e.target.value })
              }
              isInvalid={!!error.name}
            />
            <p className="required-field-meassage">{error.name}</p>
          </FloatingLabel>
          <FloatingLabel controlId="editTestimony" label="Edit Testimony*">
            <Form.Control
              as="textarea"
              placeholder="Edit Testimony*"
              value={testimonies.testimony}
              onChange={(e) =>
                setTestimonies({ ...testimonies, testimony: e.target.value })
              }
              isInvalid={!!error.testimony}
              style={{ height: "100px" }}
            />
            <p className="required-field-meassage">{error.testimony}</p>
          </FloatingLabel>
        </Modal.Body>
        <hr style={{ color: "grey" }} />
        <Row style={{ paddingBottom: "1rem" }}>
          <Col style={{ paddingLeft: "2rem" }}>
            <Button onClick={update} className="custom-btn">
              Update
            </Button>
          </Col>
          <Col style={{ paddingRight: "2rem", marginLeft: "-1rem" }}>
            <Button onClick={onHide} className="custom-btn">
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

function EditTestimonies(props) {
  const [modalShow, setModalShow] = useState(false);
  const [testimonies, setTestimonies] = useState({
    id: undefined,
    name: "",
    testimony: "",
  });
  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <EditTestimoniesModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          props.onClose();
        }}
        testimony={props.testimony}
      />
    </>
  );
}

export default EditTestimonies;
