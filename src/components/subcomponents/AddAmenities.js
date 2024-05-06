import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AmenitiesService } from "../../services/Amenities";
import { Capitalize } from "../../core/utils";

function AddAmenities(props) {
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState({
    amenity: "",
  });
  const [error, setError] = useState({
    amenity: "",
  });
  const validation = () => {
    let tempError = {
      amenity: "",
    };
    let valid = true;
    if (!amenities.amenity) {
      tempError.amenity = "Amenity is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };
  const submitAmenities = () => {
    if (validation()) {
      addAmenities();
    }
  };
  const addAmenities = async () => {
    try {
      console.log();
      const res = await AmenitiesService.addAmenities(amenities);
      if (res.status === 200) {
        alert("Amenity Added");
        navigate("/dashboard/amenities");
      } else {
        alert("Error while adding");
      }
    } catch (error) {
      alert("Error while registration");
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
            Add Amenities
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          {" "}
          <FloatingLabel
            controlId="amenity"
            label="Add Amenities"
            className="mb-3"
          >
            <Form.Control
              // type="text"
              placeholder="Add Amenities"
              value={amenities.amenity}
              onChange={(e) =>
                setAmenities({ ...amenities, amenity: e.target.value })
              }
              isInvalid={!!error.amenity}
            />
            <p className="error">{error.amenity}</p>
          </FloatingLabel>
        </div>

        <Modal.Footer>
          <Row>
            <Col>
              <Button onClick={submitAmenities} className="custom-btn">
                {" "}
                Add{" "}
              </Button>
            </Col>
            <Col>
              <Button onClick={props.onHide} className="custom-btn">
                {" "}
                Cancel{" "}
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAmenities;
