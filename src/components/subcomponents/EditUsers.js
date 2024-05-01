import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

function EditUsers(props) {
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
            Edit Users
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <FloatingLabel
                controlId="updateName"
                label="Name"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Name" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="updateMobNo"
                label="Mobile No"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Mobile No" />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <FloatingLabel
                controlId="updateEmailId"
                label="Email Id"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="Email Id" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="updatePassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Password" />
              </FloatingLabel>
            </Col>
          </Row>
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
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUsers;
