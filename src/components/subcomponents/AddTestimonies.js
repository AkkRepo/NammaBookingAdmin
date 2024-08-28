import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../pages/Others/Index";
import { TestimoniesServices } from "../../services/Testimonies";

function AddTestimonies(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [testimonies, setTestimonies] = useState({
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

  const submitTestimonies = () => {
    if (validation()) {
      addTestimony();
    }
  };

  const addTestimony = async () => {
    setLoading(true);
    try {
      const res = await TestimoniesServices.addTestimonies(testimonies);
      if (res.status === 200) {
        alert(res.message);
        setTestimonies({
          name: "",
          testimony: "",
        }); // Clear the form
        //setError({ category: "", imageUrl: "" }); // Clear errors
        props.onHide();
        props.onClose();
        navigate("/testimonies");
      } else {
        alert("Error while adding");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
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
            Add Testimony
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          <FloatingLabel
            controlId="addTestimonies"
            label="Name*"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Name"
              value={testimonies.name}
              onChange={(e) =>
                setTestimonies({ ...testimonies, name: e.target.value })
              }
              isInvalid={!!error.name}
            />
          </FloatingLabel>
          {error.name && (
            <p
              style={{
                fontSize: "12px",
                marginTop: "-10px",
                color: "red",
              }}
            >
              {error.name}
            </p>
          )}
          <FloatingLabel controlId="testimony" label="Testimony*">
            <Form.Control
              as="textarea"
              placeholder="Add Testimony"
              value={testimonies.testimony}
              onChange={(e) =>
                setTestimonies({
                  ...testimonies,
                  testimony: e.target.value,
                })
              }
              isInvalid={!!error.testimony}
              style={{ height: "100px" }}
            />
            {error.testimony && (
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "-10px",
                  color: "red",
                }}
              >
                {error.testimony}
              </p>
            )}
          </FloatingLabel>
        </div>
        <hr style={{ color: "grey" }} />
        <Row style={{ paddingBottom: "1rem" }}>
          <Col style={{ paddingLeft: "2rem" }}>
            <Button onClick={submitTestimonies} className="custom-btn">
              Add
            </Button>
          </Col>
          <Col style={{ paddingRight: "2rem", marginLeft: "-1rem" }}>
            <Button onClick={props.onHide} className="custom-btn">
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

export default AddTestimonies;
