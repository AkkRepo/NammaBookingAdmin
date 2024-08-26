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

function AddNearByPlaces(props) {
  const [show, setShow] = useState(false);
  const [nearByPlaces, setNearByPlaces] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    nearByPlaces: "",
  });
  const validation = () => {
    let tempError = { nearByPlaces: "" };
    let valid = true;
    if (!nearByPlaces) {
      tempError.nearByPlaces = "Required Field";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const addNearByPlaces = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.addNearByPlaces({
          stayId: props.id,
          placeName: nearByPlaces,
        });
        if (res.status === 200) {
          setNearByPlaces("");
          alert("Near by Places added successfully");
          props.onUpdate();
          handleClose();
        } else {
          alert("Error while adding");
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
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <h5>Add Near by Places</h5>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <FloatingLabel
              controlId="nearByPlaces"
              label="Near by Places*"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Please enter Near by Places"
                className="text-capitalize"
                value={nearByPlaces}
                onChange={(e) => setNearByPlaces(e.target.value)}
                isInvalid={!!error.nearByPlaces}
              />
              <p className="required-field-meassage">{error.nearByPlaces}</p>
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={addNearByPlaces}>
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

export default AddNearByPlaces;
