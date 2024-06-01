import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { LocationsService } from "../../services/Locations";
import { useNavigate } from "react-router-dom";

function AddLocations(props) {
  const navigate = useNavigate();
  const [locations, setLocations] = useState({
    location: "",
    imageUrl: "",
  });
  const [error, setError] = useState({
    location: "",
    imageUrl: "",
  });

  const validation = () => {
    let tempError = {
      location: "",
      imageUrl: "",
    };
    let valid = true;
    if (!locations.location) {
      tempError.location = "location is required";
      valid = false;
    }
    if (!locations.imageUrl) {
      tempError.imageUrl = "Image is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocations({ ...locations, imageUrl: reader.result.split(",")[1] });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitLocations = () => {
    if (validation()) {
      addLocation();
    }
  };

  const addLocation = async () => {
    try {
      const res = await LocationsService.addLocations(locations);
      if (res.status === 200) {
        alert("Location Added");
        navigate("/dashboard/locations");
      } else {
        alert("Error while Adding");
      }
    } catch (error) {
      alert("Error while adding category");
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
            Add Locations
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          {" "}
          <FloatingLabel
            controlId="addLocations"
            label="Add Locations"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Add Locations"
              value={locations.location}
              onChange={(e) =>
                setLocations({ ...locations, location: e.target.value })
              }
              isInvalid={!!error.location}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="locationsImage"
            label="Add Image"
            className="mb-3"
          >
            <Form.Control
              type="file"
              placeholder="Add Image"
              multiple={false}
              onChange={handleImageChange}
              isInvalid={!!error.imageUrl}
            />
          </FloatingLabel>
          <p style={{ fontSize: "12px", marginTop: "-10px", color: "#e77225" }}>
            (Maximum one image is allowed)
          </p>
        </div>

        <Modal.Footer>
          <Row>
            <Col>
              <Button onClick={submitLocations} className="custom-btn">
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

export default AddLocations;
