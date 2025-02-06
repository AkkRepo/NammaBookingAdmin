import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { BedTypeServices } from "../../services/BedType";
import { LoadingModal } from "../pages/Others/Index";

function EditBedTypeModal({ show, onHide, bedType }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bedTypes, setBedTypes] = useState({
    id: undefined,
    bedType: "",
  });
  const [error, setError] = useState({
    bedType: "",
  });

  const validation = () => {
    let tempError = {
      bedType: "",
    };
    let valid = true;
    if (!bedTypes.bedType) {
      tempError.bedType = "Bed Type is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await BedTypeServices.updateBedType({
          ...bedTypes,
        });
        if (res.status === 200) {
          alert(res.message);
          onHide();
          navigate("/bedType");
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

  useEffect(() => {
    if (show) {
      setBedTypes({
        id: bedType.id,
        bedType: bedType.bedType,
      });
    }
  }, [show]);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit BedType
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex" }}>
          <div style={{ padding: "1rem" }}>
            <FloatingLabel
              controlId="editBedTypes"
              label="Edit Bed type*"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Edit Bed type"
                value={bedTypes.bedType}
                onChange={(e) =>
                  setBedTypes({ ...bedTypes, bedType: e.target.value })
                }
                isInvalid={!!error.bedType}
              />
              <p className="required-field-meassage">{error.bedType}</p>
            </FloatingLabel>
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

function EditBedType(props) {
  const [modalShow, setModalShow] = useState(false);
  const [bedTypes, setBedTypes] = useState({
    id: undefined,
    bedType: "",
  });
  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <EditBedTypeModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          props.onClose();
        }}
        bedType={props.bedType}
      />
    </>
  );
}

export default EditBedType;
