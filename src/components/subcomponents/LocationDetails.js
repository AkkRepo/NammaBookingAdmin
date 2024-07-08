import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { LocationsService } from "../../services/Locations";
import { Capitalize } from "../../core/utils";

function LocationDetailsModal({ show, onHide, location }) {
  const { id } = useParams();
  const [locations, setLocations] = useState();
  const [loading, setLoading] = useState(false);
  const [openImage, setImage] = useState("");

  const getLocations = async () => {
    setLoading(true);
    try {
      const res = await LocationsService.getLocationsById(id);
      console.log(res.data);
      if (res.status === 200) {
        setLocations(res.data);
        if (res.data?.images?.length > 0) {
          setImage(res.data.images[0].imageUrl);
        }
      } else {
        alert(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (show) {
      getLocations({
        id: location.id,
        location: location.location,
        imageUrl: location.imageUrl,
      });
    }
  }, []);

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
            View Location Details
          </Modal.Title>
        </Modal.Header>
        {location?.id && !loading && (
          <div>
            <br />
            <h4 style={{ textAlign: "center" }}>{Capitalize(location.location)}</h4>
          </div>
        )}
        <br />

        <div style={{ marginLeft: "5rem" }}>
          {location.imageUrl && (
            <div style={{ textAlign: "center" }}>
              <Image
                rounded
                src={location.imageUrl}
                alt="Selected"
                style={{ width: "20rem", height: "12rem" }}
              />
            </div>
          )}
        </div>
        <br/>
        <Modal.Footer>
          <Row>
            <Col>
              <Button onClick={onHide} className="custom-btn">
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function LocationDetails(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <FontAwesomeIcon
        icon={faCircleInfo}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <LocationDetailsModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        location={props.location}
      />
    </>
  );
}

export default LocationDetails;
