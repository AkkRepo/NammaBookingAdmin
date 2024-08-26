import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { LocationsService } from "../../services/Locations";
import { LoadingModal } from "../pages/Others/Index";

function EditLocationsModal({ show, onHide, location }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState({
    id: undefined,
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
      tempError.location = "Location is required";
      valid = false;
    }
    if (!locations.imageUrl) {
      tempError.imageUrl = "Image is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async (id) => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await LocationsService.updateLocations({
          ...locations,
          imageUrl: image ? locations.imageUrl.slice(23) : null,
        });
        if (res.status === 200) {
          alert(res.message);
          onHide();
          navigate("/locations");
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

  const getLocations = async (id) => {
    try {
      const res = await LocationsService.getLocationsById(id);
      if (res.status === 200) {
        setLocations({
          id: res.data.id,
          location: res.data.location,
          imageUrl: res.data.imageUrl,
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
      getLocations(location.id);
    }
  }, [show]);

  //Image base64
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        //console.log("Base64 String:", base64String);
        const slicedString = base64String.slice(23);
        console.log(base64String);
        console.log("Sliced String:", slicedString);
        setLocations({ ...locations, imageUrl: base64String });
        setImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

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
            Edit Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex" }}>
          <div style={{ padding: "1rem" }}>
            <FloatingLabel
              controlId="editLocations"
              label="Edit Location"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Edit Location"
                value={locations.location}
                onChange={(e) =>
                  setLocations({ ...locations, location: e.target.value })
                }
                isInvalid={!!error.location}
              />
              <p className="required-field-meassage">{error.location}</p>
            </FloatingLabel>
            <FloatingLabel
              controlId="locationsImage"
              label="Edit Image"
              className="mb-3"
            >
              <Form.Control
                type="file"
                placeholder="Edit Image"
                multiple={false}
                onChange={handleImageChange}
                isInvalid={!!error.imageUrl}
              />
              <p>{error.imageUrl}</p>
            </FloatingLabel>
          </div>
          <div style={{ marginLeft: "2rem" }}>
            {locations.imageUrl && (
              <div style={{ textAlign: "center" }}>
                <Image
                  rounded
                  src={locations.imageUrl}
                  alt="Selected"
                  style={{ width: "20rem", height: "12rem" }}
                  loading="lazy"
                />
              </div>
            )}
          </div>
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

function EditLocations(props) {
  const [modalShow, setModalShow] = useState(false);
  const [locations, setLocations] = useState({
    id: undefined,
    location: "",
    imageUrl: "",
  });
  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <EditLocationsModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          props.onClose();
        }}
        location={props.location}
      />
    </>
  );
}

export default EditLocations;
