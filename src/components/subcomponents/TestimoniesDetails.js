import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Badge, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { TestimoniesServices } from "../../services/Testimonies";

function StatusBadge({ value }) {
  const s = (value || "").toUpperCase();
  let variant = "secondary";
  if (s === "APPROVED") variant = "success";
  else if (s === "PENDING") variant = "warning";
  else if (s === "REJECTED") variant = "danger";
  return <Badge bg={variant}>{s || "—"}</Badge>;
}

function RatingView({ value }) {
  if (value === null || value === undefined) return <>—</>;
  const n = Number(value);
  const stars = Array.from({ length: 5 }, (_, i) => (i < n ? "★" : "☆")).join("");
  return (
    <span style={{ whiteSpace: "nowrap" }}>
      {stars} <span style={{ color: "#888", marginLeft: 6 }}>({n})</span>
    </span>
  );
}

const fmt = (d) =>
  d ? new Date(d).toLocaleString(undefined, { hour12: false }) : "—";

function TestimoniesDetailsModal({ show, onHide, testimony }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getById = async (id) => {
    setLoading(true);
    try {
      const res = await TestimoniesServices.getTestimoniesById(id);
      if (res.status === 200) {
        setData(res.data);
      } else {
        alert(res?.data?.message || "Unable to load testimonial");
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show && testimony?.id) getById(testimony.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, testimony?.id]);

  return (
    <>
      {data && !loading && (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <span className="brownbear view-details-heading-style heading-color">
                {data.name || "—"}
              </span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Testimony text */}
            <p className="testimonial-font-size" style={{ whiteSpace: "pre-wrap" }}>
              {data.testimony || "—"}
            </p>

            <hr />

            {/* Meta grid */}
            <Row className="mb-2">
              <Col md={6} className="mb-2">
                <b>Status:</b> <StatusBadge value={data.status} />
              </Col>
              <Col md={6} className="mb-2">
                <b>Rating:</b> <RatingView value={data.rating} />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6} className="mb-2">
                <b>Email:</b> {data.email || "—"}
              </Col>
              <Col md={6} className="mb-2">
                <b>Phone:</b> {data.phone || "—"}
              </Col>
            </Row>

          </Modal.Body>
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
        onHide={() => setModalShow(false)}
        testimony={props.testimony}
      />
    </>
  );
}

export default TestimoniesDetails;
