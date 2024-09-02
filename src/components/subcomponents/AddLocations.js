import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image } from "react-bootstrap";
import { LocationsService } from "../../services/Locations";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../pages/Others/Index";

function AddLocations(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    if (!locations.location || !locations.location.match(/^[a-zA-Z'" ]*$/)) {
      tempError.location =
        "Location is required and should contain only letters and inverted commas";
      valid = false;
    }
    if (!locations.imageUrl) {
      tempError.imageUrl = "Image is required or invalid size";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 300 * 1024) {
      // Convert KB to bytes
      alert("File size exceeds 300KB limit. Please select a smaller file.");
      e.target.files = null;
      return;
    }
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
    setLoading(true);
    try {
      const res = await LocationsService.addLocations(locations);
      if (res.status === 200) {
        alert(res.message);
        setLocations({ location: "", imageUrl: "" }); // Clear the form
        //setError({ category: "", imageUrl: "" }); // Clear errors
        props.onHide();
        props.onClose();
        navigate("/locations");
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
            Add Location
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          <Row>
            <Col>
              {" "}
              <FloatingLabel
                controlId="addLocation"
                label="Add Location"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Add Location"
                  value={locations.location}
                  onChange={(e) =>
                    setLocations({ ...locations, location: e.target.value })
                  }
                  isInvalid={!!error.location}
                />
              </FloatingLabel>
              {error.location && (
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "-10px",
                    color: "red",
                  }}
                >
                  {error.location}
                </p>
              )}
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
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "-10px",
                  color: "#e77225",
                }}
              >
                (Maximum one image is allowed)
              </p>
            </Col>
            <Col>
              <div style={{ marginLeft: "2rem" }}>
                {locations.imageUrl && (
                  <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <Image
                      rounded
                      src={`data:image/jpeg;base64,${locations.imageUrl}`}
                      alt="Uploaded"
                      style={{ width: "20rem", height: "12rem" }}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
        <hr style={{ color: "grey" }} />
        <Row style={{ paddingBottom: "1rem" }}>
          <Col style={{ paddingLeft: "2rem" }}>
            <Button onClick={submitLocations} className="custom-btn">
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

export default AddLocations;
