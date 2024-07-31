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
          console.log(res.data.images[0].imageUrl);
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
        size="md-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {location?.id && !loading && (
              <p className="brownbear view-details-heading-style heading-color">
                {location.location}
              </p>
            )}
          </Modal.Title>
        </Modal.Header>

        <br />

        <div>
          {location.imageUrl && (
            <div style={{ textAlign: "center" }}>
              <Image
                //rounded
                className="view-details-image-style"
                src={location.imageUrl}
                alt="Selected"
                style={{ width: "25rem", height: "17rem" }}
                loading="lazy"
              />
            </div>
          )}
        </div>
        <br />
        {/*
        <Modal.Footer>
          <Row>
            <Col>
              <Button onClick={onHide} className="custom-btn">
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Footer> */}
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
