import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../pages/Others/Index";

//pages
import { BedTypeServices } from "../../services/BedType";

function AddBedType(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bedType, setBedType] = useState({
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
    if (!bedType.bedType) {
      tempError.bedType = "Bed Type is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const submitBedType = () => {
    if (validation()) {
      addBedType();
    }
  };

  const addBedType = async () => {
    setLoading(true);
    try {
      const res = await BedTypeServices.addBedType(bedType);
      if (res.status === 200) {
        alert(res.message);
        setBedType({ bedType: "" }); // Clear the form
        //setError({ name: "", email: "", password:"", roleId: 1 }); // Clear errors
        props.onHide();
        props.onClose();
        navigate("/bedType");
      } else {
        alert("Error while adding");
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
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Bed type
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <FloatingLabel controlId="name" label="Bed type" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={bedType.bedType}
                  onChange={(e) =>
                    setBedType({ ...bedType, bedType: e.target.value })
                  }
                  isInvalid={!!error.bedType}
                />
                <p className="required-field-meassage">{error.bedType}</p>
              </FloatingLabel>
            </Col>
          </Row>
        </div>
        <hr style={{ color: "grey" }} />
        <Row style={{ paddingBottom: "1rem" }}>
          <Col style={{ paddingLeft: "2rem" }}>
            <Button onClick={submitBedType} className="custom-btn">
              {" "}
              Add{" "}
            </Button>
          </Col>
          <Col style={{ paddingRight: "2rem", marginLeft: "-1rem" }}>
            <Button onClick={props.onHide} className="custom-btn-reverse">
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

export default AddBedType;
