import React, { useEffect, useState } from "react";
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

function EditNearByePlaces(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const [nearByPlaces, setNearByPlaces] = useState({
    id: 0,
    placeName: "",
  });

  const [error, setError] = useState({
    placeName: "",
  });

  const validation = () => {
    let tempError = {
      placeName: "",
    };
    let valid = true;
    if (!nearByPlaces.placeName) {
      tempError.placeName = "Required Field";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.updateNearByPlaces({
          id: nearByPlaces.id,
          placeName: nearByPlaces.placeName,
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
    setNearByPlaces({ ...props.placeName });
  }, [props.placeName]);
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <h5>Edit Near by Places</h5>
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
                value={nearByPlaces.placeName}
                onChange={(e) =>
                  setNearByPlaces({
                    ...nearByPlaces,
                    placeName: e.target.value,
                  })
                }
                isInvalid={!!error.placeName}
              />
              <p className="required-field-meassage">{error.placeName}</p>
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

export default EditNearByePlaces;
