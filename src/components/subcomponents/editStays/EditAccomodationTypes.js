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

function EditAccomodationType(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const [accomodation, setAccomodation] = useState({
    id: 0,
    roomName: "",
    roomType: "",
    noOfRooms: "",
    noOfGuests: "",
  });

  const [error, setError] = useState({
    roomName: "",
    roomType: "",
    noOfRooms: "",
    noOfGuests: "",
  });

  const validation = () => {
    let tempError = {
      roomName: "",
      roomType: "",
      noOfRooms: "",
      noOfGuests: "",
    };
    let valid = true;
    if (!accomodation.roomName) {
      tempError.roomName = "Required Field";
      valid = false;
    }

    if (
      !accomodation.noOfRooms ||
      !String(accomodation.noOfRooms).match(/^\d+$/)
    ) {
      tempError.noOfRooms = "Required Field";
      valid = false;
    }
    if (
      !accomodation.noOfGuests ||
      !String(accomodation.noOfGuests).match(/^\d+$/)
    ) {
      tempError.noOfGuests = "Required Field";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.updateAccomodationType({
          id: accomodation.id,
          roomName: accomodation.roomName,
          roomType: accomodation.roomType,
          noOfRooms: accomodation.noOfRooms,
          noOfGuests: accomodation.noOfGuests,
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
    setAccomodation({ ...props.accomodation });
  }, [props.accomodation]);
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <h5>Edit Accomodation Type</h5>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FloatingLabel
                controlId="roomName"
                label="Room Name*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Room Name"
                  className="text-capitalize"
                  value={accomodation.roomName}
                  onChange={(e) =>
                    setAccomodation({
                      ...accomodation,
                      roomName: e.target.value,
                    })
                  }
                  isInvalid={!!error.roomName}
                />
                <p className="required-field-meassage">{error.roomName}</p>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="roomType"
                label="Room Type"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Room Name"
                  className="text-capitalize"
                  value={accomodation.roomType}
                  onChange={(e) =>
                    setAccomodation({
                      ...accomodation,
                      roomType: e.target.value,
                    })
                  }
                  isInvalid={!!error.roomType}
                />
                <p className="required-field-meassage">{error.roomType}</p>
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <FloatingLabel
                controlId="noOfRooms"
                label="No. of Rooms*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="No. of Rooms"
                  className="text-capitalize"
                  value={accomodation.noOfRooms}
                  onChange={(e) =>
                    setAccomodation({
                      ...accomodation,
                      noOfRooms: e.target.value,
                    })
                  }
                  isInvalid={!!error.noOfRooms}
                />
                <p className="required-field-meassage">{error.noOfRooms}</p>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="noOfGuests"
                label="No. of Guests*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="No. of Guests"
                  className="text-capitalize"
                  value={accomodation.noOfGuests}
                  onChange={(e) =>
                    setAccomodation({
                      ...accomodation,
                      noOfGuests: e.target.value,
                    })
                  }
                  isInvalid={!!error.noOfGuests}
                />
                <p className="required-field-meassage">{error.noOfGuests}</p>
              </FloatingLabel>
            </Col>
          </Row>
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

export default EditAccomodationType;
