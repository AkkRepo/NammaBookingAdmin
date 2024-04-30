import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

function EditAmenities(props) {
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
            Edit Amenities
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          {" "}
          <FloatingLabel
            controlId="editAmenities"
            label="Edit Amenities"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Edit Amenities" />
          </FloatingLabel>
        </div>

        <Modal.Footer>
          <Row>
            <Col>
              <Button onClick={props.onHide} className="custom-btn">
                {" "}
                Update{" "}
              </Button>
            </Col>
            <Col>
              <Button onClick={props.onHide} className="custom-btn">
                {" "}
                No{" "}
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAmenities;
