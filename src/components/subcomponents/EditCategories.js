import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

function EditCategories(props) {
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
            Edit Categories
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          {" "}
          <FloatingLabel
            controlId="addCategories"
            label="Add Categories"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Add Categories" />
          </FloatingLabel>
          <FloatingLabel
            controlId="categoryImage"
            label="Edit Image"
            className="mb-3"
          >
            <Form.Control
              type="file"
              placeholder="Edit Image"
              multiple={false}
            />
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
                Cancel{" "}
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCategories;
