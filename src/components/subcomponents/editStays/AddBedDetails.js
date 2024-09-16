import React, { useState, useEffect } from "react";
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
import { BedTypeServices } from "../../../services/BedType";

function AddBedDetails(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);

  //Bed Type start
  const [bedType, setBedType] = useState([]);
  const getBedType = async () => {
    try {
      const res = await BedTypeServices.getAllBedTypes();
      if (res.data?.length > 0) {
        setBedType(res.data);
      } else {
        setBedType([]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getBedType();
  }, []);
  //Bed Type end

  //Bed details  input start
  const [bedDetails, setBedDetails] = useState({
    noOfBeds: undefined,
    bedTypeDetails: {
      id: 0,
      bedType: "",
    },
  });
  const [addError, setAddError] = useState({
    noOfBeds: undefined,
    bedTypeDetails: {
      id: 0,
      bedType: "",
    },
  });
  const validation = () => {
    let tempError = {
      noOfBeds: undefined,
      bedTypeDetails: {
        id: 0,
        bedType: "",
      },
    };
    let valid = true;
    if (!bedDetails.noOfBeds || !bedDetails.noOfBeds.match(/^\d+$/)) {
      tempError.noOfBeds = "Required field";
      valid = false;
    }
    if (!bedDetails.bedTypeDetails) {
      tempError.bedTypeDetails = "Required field";
      valid = false;
    }
    setAddError(tempError);
    return valid;
  };

  //Bed Details multiple input end
  const addBedDetails = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.addBedDetails({
          stayAccommodationTypeId: props.id,
          noOfBeds: bedDetails.noOfBeds,
          bedTypeId: Number(bedDetails.bedTypeDetails.id),
        });
        if (res.status === 200) {
          setBedDetails({
            noOfBeds: undefined,
            bedTypeDetails: {
              id: 0,
              bedType: "",
            },
          });
          alert("Bed Details added successfully");
          props.onUpdate(props.id);
          handleClose();
        } else {
          alert("All fields are required");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert(error.message);
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Bed Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FloatingLabel controlId="Bed Type" label="Bed Type*">
                <Form.Select
                  required
                  aria-label="Bed Type*"
                  value={bedDetails.bedTypeDetails?.id}
                  onChange={(e) =>
                    setBedDetails({
                      ...bedDetails,
                      bedTypeDetails: {
                        ...bedDetails.bedTypeDetails,
                        id: e.target.value,
                      },
                    })
                  }
                  isInvalid={!!addError.bedTypeId}
                >
                  <option>Select</option>
                  {bedType.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.bedType}
                    </option>
                  ))}
                </Form.Select>
                <p className="required-field-meassage">{addError.noOfBeds}</p>
              </FloatingLabel>
            </Col>
            <Col>
              {" "}
              <FloatingLabel
                controlId="noOfBeds"
                label="No. of Beds*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="No. of Beds*"
                  className="text-capitalize"
                  value={bedDetails.noOfBeds}
                  onChange={(e) =>
                    setBedDetails({ ...bedDetails, noOfBeds: e.target.value })
                  }
                  isInvalid={!!addError.noOfBeds}
                />
                <p className="required-field-meassage">{addError.noOfBeds}</p>
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={addBedDetails}>
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
        size="sm"
        className="stay-edit-button"
        style={{ padding: "10px", borderRadius: "4rem", marginLeft: "27rem" }}
      />
      <LoadingModal show={loading} />
    </div>
  );
}

export default AddBedDetails;
