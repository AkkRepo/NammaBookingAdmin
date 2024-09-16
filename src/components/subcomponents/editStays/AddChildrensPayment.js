import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FloatingLabel,
  Button,
  Table,
  Image,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { Capitalize } from "../../../core/utils";
import { StaysService } from "../../../services/Stays";
import AddAmenities from "./AddAmenities";
import { LoadingModal } from "../../pages/Others/Index";

function AddChildrensPayment(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);

  //Childrens payment multiple input start
  const [newChildrensPaymentInputData, setNewChildrensPaymentInputData] =
    useState({
      label: "",
      details: "",
    });
  const [addError, setAddError] = useState({
    label: "",
    details: "",
  });
  const validation = () => {
    let tempError = {
      label: "",
      details: "",
    };
    let valid = true;
    if (!newChildrensPaymentInputData.label) {
      tempError.label = "Required field";
      valid = false;
    }
    if (!newChildrensPaymentInputData.details) {
      tempError.details = "Required field";
      valid = false;
    }
    setAddError(tempError);
    return valid;
  };

  //Childrens Payment multiple input end
  const addChildrensPaymnetDetails = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.addChildrensPayment({
          stayId: props.id,
          label: newChildrensPaymentInputData.label,
          details: newChildrensPaymentInputData.details,
        });
        if (res.status === 200) {
          setNewChildrensPaymentInputData({
            label: "",
            details: "",
          });
          alert("Children's payment data added successfully");
          props.onUpdate();
          handleClose();
        } else {
          alert("All fields are required");
        }
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Children's Payment data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FloatingLabel controlId="Label" label="Label*" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Label"
                  className="text-capitalize"
                  value={newChildrensPaymentInputData.label}
                  onChange={(e) => {
                    setNewChildrensPaymentInputData({
                      ...newChildrensPaymentInputData,
                      label: Capitalize(e.target.value),
                    });
                  }}
                  isInvalid={!!addError.label}
                />
                <p className="required-field-meassage">{addError.label}</p>
              </FloatingLabel>
            </Col>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="details"
                  label="Details*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Details"
                    className="text-capitalize"
                    value={newChildrensPaymentInputData.details}
                    onChange={(e) => {
                      setNewChildrensPaymentInputData({
                        ...newChildrensPaymentInputData,
                        details: e.target.value,
                      });
                    }}
                    isInvalid={!!addError.details}
                  />
                  <p className="required-field-meassage">{addError.details}</p>
                </FloatingLabel>
              </Col>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={addChildrensPaymnetDetails}>
            Add
          </Button>
          <Button className="custom-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <FontAwesomeIcon
        icon={faPlus}
        onClick={handleShow}
        size="lg"
        className="stay-edit-button"
        style={{ padding: "10px", borderRadius: "4rem" }}
      />
      <LoadingModal show={loading} />
    </div>
  );
}

export default AddChildrensPayment;
