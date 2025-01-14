import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  Row,
  Col,
  Form,
  FloatingLabel,
  Image,
  Container,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { LocationsService } from "../../services/Locations";
import { LoadingModal } from "../pages/Others/Index";
import EditLocationMoreInfo from "./EditLocationMoreInfo";
import AddLocationMoreInfo from "./AddLocationMoreInfo";

function EditLocationsModal({ show, onHide, location }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState({
    id: undefined,
    location: "",
    imageUrl: "",
    readMoreDetails: [], // Initialized as an empty array
  });
  const [error, setError] = useState({
    location: "",
    imageUrl: "",
    label: "",
    details: "",
  });

  const validation = () => {
    let tempError = {
      label: "",
      details: "",
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
    if (!locations.label) {
      tempError.label = "label is required";
      valid = false;
    }
    if (!locations.details) {
      tempError.details = "details is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async (id) => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await LocationsService.updateReadMoreDetails({
          ...locations,
          // imageUrl: image ? locations.imageUrl.slice(23) : null,
          label: locations.label,
          details: locations.details,
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
  const [fullscreen, setFullscreen] = useState(true);
  const getLocations = async (id) => {
    try {
      const res = await LocationsService.getLocationsById(id);
      if (res.status === 200) {
        setLocations({
          id: res.data.id,
          location: res.data.location,
          imageUrl: res.data.imageUrl,
          readMoreDetails: res.data.readMoreDetails || [],
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
    if (file.size > 300 * 1024) {
      // Convert KB to bytes
      alert("File size exceeds 300KB limit. Please select a smaller file.");
      event.target.files = null;
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const slicedString = base64String.slice(23);
        setLocations({ ...locations, imageUrl: base64String });
        setImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

  //delete ReadMore
  const deleteReadMore = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await LocationsService.deleteReadMore(id);
        if (res.status === 200) {
          alert(res.message);
          getLocations(location.id);
        } else {
          alert("Error while deleting");
        }
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
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen={fullscreen}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {location.location}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col style={{ display: "flex" }}>
            <h4 className="edit-stays-accomodation-type">More Information:</h4>
            <AddLocationMoreInfo
              id={location.id}
              onUpdateStay={() => getLocations(location.id)}
            />
          </Col>
          <div style={{ padding: "1rem" }}>
            <Container
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "1rem",
              }}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sl no</th>
                    <th>Label</th>
                    <th>Details</th>
                    <th>Edit</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(locations.readMoreDetails) &&
                  locations.readMoreDetails.length > 0 ? (
                    locations.readMoreDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.label || "No Label"}</td>
                        <td>{item.details || "No Details"}</td>
                        <td>
                          {/* Replace with the Edit functionality */}
                          <EditLocationMoreInfo
                            readMoreInfo={item}
                            onUpdateStay={() => getLocations(location.id)} // Pass the callback to re-fetch data
                          />
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="stay-trash-button"
                            onClick={(e) => {
                              deleteReadMore(item.id);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Container>
          </div>
        </Modal.Body>
        <hr style={{ color: "grey" }} />
        <Row style={{ paddingBottom: "1rem" }}>
          <Col style={{ paddingLeft: "2rem" }}>
            <Button onClick={onHide} className="custom-btn">
              Cancel
            </Button>
          </Col>
          <Col />
          <Col />
        </Row>
      </Modal>
      <LoadingModal show={loading} />
    </>
  );
}

function LocationReadMore(props) {
  const [modalShow, setModalShow] = useState(false);
  const [locations, setLocations] = useState({
    id: undefined,
    location: "",
    imageUrl: "",
    readMoreDetails: [], // Initialized as an empty array
  });

  return (
    <>
      <FontAwesomeIcon
        icon={faCircleInfo}
        size="lg"
        className="custom-icon"
        style={{ marginLeft: "2rem" }}
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

export default LocationReadMore;
