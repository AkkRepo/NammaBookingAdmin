import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function EditLocationsModal(props) {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
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
            Edit Categories
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex" }}>
          <div style={{ padding: "1rem" }}>
            <FloatingLabel
              controlId="addLocations"
              label="Add Locations"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Add Categories" />
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
              />
            </FloatingLabel>
          </div>
          <div style={{ marginLeft: "5rem" }}>
            {image && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Image
                  rounded
                  src={image}
                  alt="Selected"
                  style={{ width: "10rem", height: "12rem" }}
                />
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Row>
            <Col>
              <Button onClick={props.onHide} className="custom-btn">
                Update
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

function TestingFile() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <EditLocationsModal show={modalShow} onHide={() => setModalShow(false)} />
      {/*<Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
    </>
  );
}

export default TestingFile;
