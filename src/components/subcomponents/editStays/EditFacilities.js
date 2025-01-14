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
import { useEffect } from "react";
import { LoadingModal } from "../../pages/Others/Index";

function EditFacilities(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const [facilities, setFacilities] = useState({
    id: 0,
    facility: "",
  });

  const [error, setError] = useState({
    facility: "",
  });

  const validation = () => {
    let tempError = {
      facility: "",
    };
    let valid = true;
    if (!facilities.facility) {
      tempError.facility = "Required Field";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.updateFacility({
          id: facilities.id,
          facility: facilities.facility,
        });
        if (res.status === 200) {
          alert(res.message);
          props.onUpdateStay();
          handleClose();
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
    setFacilities({ ...props.facility });
  }, [props.facilities]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <h5>Edit Facility</h5>
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
                value={facilities.facility}
                onChange={(e) =>
                  setFacilities({ ...facilities, facility: e.target.value })
                }
                isInvalid={!!error.facility}
              />
              <p className="required-field-meassage">{error.facility}</p>
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={update}>
            Edit
          </Button>
          <Button className="custom-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <FontAwesomeIcon
        icon={faPen}
        onClick={handleShow}
        className="stay-trash-button"
      />
      <LoadingModal show={loading} />
    </div>
  );
}

export default EditFacilities;
