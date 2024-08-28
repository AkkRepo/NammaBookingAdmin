import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { LocationsService } from "../../services/Locations";
import { Capitalize } from "../../core/utils";
import { TestimoniesServices } from "../../services/Testimonies";

function TestimoniesDetailsModal({ show, onHide, testimony }) {
  const [testimonies, setTestimonies] = useState();
  const [loading, setLoading] = useState(false);
  const [openImage, setImage] = useState("");

  const getTestimonies = async (id) => {
    setLoading(true);
    try {
      const res = await TestimoniesServices.getTestimoniesById(id);
      if (res.status === 200) {
        setTestimonies(res.data);
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
      getTestimonies(testimony.id);
    }
  }, [show]);

  return (
    <>
      {testimonies && !loading && (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <p className="brownbear view-details-heading-style heading-color">
                {testimonies.name}
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="testimonial-font-size">{testimonies.testimony}</p>
          </Modal.Body>

          <br />
        </Modal>
      )}
    </>
  );
}

function TestimoniesDetails(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <FontAwesomeIcon
        icon={faCircleInfo}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <TestimoniesDetailsModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        testimony={props.testimony}
      />
    </>
  );
}

export default TestimoniesDetails;
