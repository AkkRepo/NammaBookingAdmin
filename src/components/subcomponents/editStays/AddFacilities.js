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
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Capitalize } from "../../../core/utils";
import { StaysService } from "../../../services/Stays";
import { LoadingModal } from "../../pages/Others/Index";

function AddFacilities(props) {
  const [show, setShow] = useState(false);
  const [facility, setFacility] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState({
    facility: "",
  });
  const validation = () => {
    let tempError = { facility: "" };
    let valid = true;
    if (!facility) {
      tempError.facility = "Required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const addFacility = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.addFacility({
          stayId: props.id,
          facility: facility,
        });
        if (res.status === 200) {
          setFacility("");
          alert("Facility added successfully");
          props.onUpdate();
          handleClose();
        } else {
          alert("Else Error");
        }
        setLoading(false);
      } catch (error) {
        alert("Catch error");
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <h5>Add Facility</h5>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <FloatingLabel
              controlId="facility"
              label="Facility*"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Please enter Facility"
                className="text-capitalize"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                isInvalid={!!error.facility}
              />
              <p>{error.facility}</p>
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={addFacility}>
            Add
          </Button>
          <Button className="custom-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <FontAwesomeIcon
        icon={faPlus}
        size="xs"
        onClick={handleShow}
        className="stay-edit-button"
        style={{ padding: "8px", borderRadius: "5rem" }}
      />
      <LoadingModal show={loading} />
    </div>
  );
}

export default AddFacilities;
