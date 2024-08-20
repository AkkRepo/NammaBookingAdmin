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

function AddActivities(props) {
  const [show, setShow] = useState(false);
  const [activity, setActivity] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    activity: "",
  });
  const validation = () => {
    let tempError = { activity: "" };
    let valid = true;
    if (!activity) {
      tempError.activity = "Required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };
  const addActivity = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.addActivity({
          stayId: props.id,
          activity: activity,
        });
        if (res.status === 200) {
          setActivity("");
          alert("Activity added successfully");
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
          <h5>Add Activity</h5>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <FloatingLabel
              controlId="activity"
              label="Activity*"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Please enter Activity"
                className="text-capitalize"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                isInvalid={!!error.activity}
              />
              <p>{error.activity}</p>
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={addActivity}>
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

export default AddActivities;
