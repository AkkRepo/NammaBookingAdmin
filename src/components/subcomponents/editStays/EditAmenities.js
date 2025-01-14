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

function EditAmenities(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const [amenities, setAmenities] = useState({
    id: 0,
    amenity: "",
  });

  const [error, setError] = useState({
    amenity: "",
  });

  const validation = () => {
    let tempError = {
      amenity: "",
    };
    let valid = true;
    if (!amenities.amenity) {
      tempError.amenity = "Required Field";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.updateAmenity({
          id: amenities.id,
          amenity: amenities.amenity,
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
    setAmenities({ ...props.amenity });
  }, [props.amenity]);
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <h5>Edit Amenity</h5>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <FloatingLabel
              controlId="amenity"
              label="Amenity*"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Please enter Amenity"
                className="text-capitalize"
                value={amenities.amenity}
                onChange={(e) =>
                  setAmenities({ ...amenities, amenity: e.target.value })
                }
                isInvalid={!!error.amenity}
              />
              <p className="required-field-meassage">{error.amenity}</p>
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={update}>
            Update
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

export default EditAmenities;
