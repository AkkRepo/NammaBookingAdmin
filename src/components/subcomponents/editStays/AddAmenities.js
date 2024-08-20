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

function AddAmenities(props) {
  const [show, setShow] = useState(false);
  const [amenity, setAmenity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState({
    amenity: "",
  });
  const validation = () => {
    let tempError = { amenity: "" };
    let valid = true;
    if (!amenity) {
      tempError.amenity = "Required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const addAmenity = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.addAmenity({
          stayId: props.id,
          amenity: amenity,
        });
        if (res.status === 200) {
          setAmenity("");
          alert("Amenity added successfully");
          props.onUpdate();
          handleClose();
        } else {
          alert("Error when adding amenity");
        }
        setLoading(false);
      } catch (error) {
        alert("Error when adding amenity");
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <h5>Add Amenity</h5>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <FloatingLabel
              controlId="amenities"
              label="Amenity*"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Please enter Amenity"
                className="text-capitalize"
                value={amenity}
                onChange={(e) => setAmenity(e.target.value)}
                isInvalid={!!error.amenity}
              />
              <p>{error.amenity}</p>
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={addAmenity}>
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

export default AddAmenities;
