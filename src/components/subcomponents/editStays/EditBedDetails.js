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
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { StaysService } from "../../../services/Stays";
import { LoadingModal } from "../../pages/Others/Index";
import { BedTypeServices } from "../../../services/BedType";

function EditBedDetails(props) {
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

  const [bedDetails, setBedDetails] = useState({
    id: 0,
    noOfBeds: undefined,
    bedTypeDetails: {
      id: 0,
      bedType: "",
    },
  });

  const [error, setError] = useState({
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
    if (!bedDetails.noOfBeds) {
      tempError.noOfBeds = "Required Field";
      valid = false;
    }
    if (!bedDetails.bedTypeDetails) {
      tempError.bedTypeDetails = "Required Field";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.updateBedDetails({
          id: bedDetails.id,
          noOfBeds: bedDetails.noOfBeds,
          bedTypeId: Number(bedDetails.bedTypeDetails.id),
        });
        if (res.status === 200) {
          alert(res.message);
          props.onUpdateStay(bedDetails.id);
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
    setBedDetails({ ...props.bedDetails });
  }, [props.bedDetails]);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>Edit Bed details</h5>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
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
                    isInvalid={!!error.bedTypeId}
                  >
                    <option>Select</option>
                    {bedType.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.bedType}
                      </option>
                    ))}
                  </Form.Select>
                  <p className="required-field-meassage">{error.noOfBeds}</p>
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
                    isInvalid={!!error.noOfBeds}
                  />
                  <p className="required-field-meassage">{error.noOfBeds}</p>
                </FloatingLabel>
              </Col>
            </Row>
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

export default EditBedDetails;
