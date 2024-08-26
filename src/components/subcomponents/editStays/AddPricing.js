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
import { faPen, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { Capitalize } from "../../../core/utils";
import { StaysService } from "../../../services/Stays";
import AddAmenities from "./AddAmenities";
import { LoadingModal } from "../../pages/Others/Index";

function AddPricing(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);

  //Pricing multiple input start
  const [newPricingInputData, setNewPricingInputData] = useState({
    packageName: "",
    price: "",
    packageDetails: "",
    selectacc: "",
  });
  const [addError, setAddError] = useState({
    packageName: "",
    price: "",
    packageDetails: "",
    selectacc: "",
  });
  const validation = () => {
    let tempError = {
      packageName: "",
      price: "",
      packageDetails: "",
      selectacc: "",
    };
    let valid = true;
    if (!newPricingInputData.packageName) {
      tempError.packageName = "Required field";
      valid = false;
    }
    if (!newPricingInputData.price) {
      tempError.price = "Required field";
      valid = false;
    }
    if (!newPricingInputData.packageDetails) {
      tempError.packageDetails = "Required field";
      valid = false;
    }
    if (!newPricingInputData.selectacc) {
      tempError.selectacc = "Required field";
      valid = false;
    }
    setAddError(tempError);
    return valid;
  };

  //Pricing multiple input end
  const addPricingDetails = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.addPricingDetails({
          stayId: props.id,
          packageName: newPricingInputData.packageName,
          price:
            newPricingInputData.price + " " + newPricingInputData.selectacc,
          packageDetails: newPricingInputData.packageDetails,
        });
        if (res.status === 200) {
          setNewPricingInputData({
            packageName: "",
            price: "",
            packageDetails: "",
            selectacc: "",
          });
          alert("Pricing added successfully");
          props.onUpdate();
          handleClose();
        } else {
          alert("All fields are required");
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
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Pricing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FloatingLabel
                controlId="roomName"
                label="Package Name*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="text-capitalize"
                  value={newPricingInputData.packageName}
                  onChange={(e) => {
                    setNewPricingInputData({
                      ...newPricingInputData,
                      packageName: Capitalize(e.target.value),
                    });
                  }}
                  isInvalid={!!addError.packageName}
                />
                <p className="required-field-meassage">
                  {addError.packageName}
                </p>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="price" label="Price" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Price*"
                  style={{ textTransform: "capitalize" }}
                  value={newPricingInputData.price}
                  onChange={(e) => {
                    setNewPricingInputData({
                      ...newPricingInputData,
                      price: e.target.value,
                    });
                  }}
                  isInvalid={!!addError.price}
                />
                <p className="required-field-meassage">{addError.price}</p>
              </FloatingLabel>
            </Col>{" "}
            <Col>
              <FloatingLabel controlId="selectacc" label="Select*">
                <Form.Select
                  aria-label="Select*"
                  value={newPricingInputData.selectacc}
                  onChange={(e) =>
                    setNewPricingInputData({
                      ...newPricingInputData,
                      selectacc: e.target.value,
                    })
                  }
                  isInvalid={!!addError.selectacc}
                >
                  <option>Select</option>
                  <option value="Price / Per Person">Price / Per Person</option>
                  <option value="Price / Per Room">Price / Per Room</option>
                </Form.Select>
                {/* <p className="required-field-meassage">
                    {addError.selectacc}
                  </p> */}
                <p className="required-field-meassage">
                  {addError.packageName}
                </p>
              </FloatingLabel>
            </Col>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="packageIncludes"
                  label="Package Details*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="text-capitalize"
                    value={newPricingInputData.packageDetails}
                    onChange={(e) => {
                      setNewPricingInputData({
                        ...newPricingInputData,
                        packageDetails: Capitalize(e.target.value),
                      });
                    }}
                    isInvalid={!!addError.packageDetails}
                  />
                  <p className="required-field-meassage">
                    {addError.packageDetails}
                  </p>
                </FloatingLabel>
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <Button onClick={addData} className="custom-btn-reverse">
                  Add Price
                </Button>
              </Col>
            </Row> */}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={addPricingDetails}>
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
        size="lg"
        className="stay-edit-button"
        style={{ padding: "10px", borderRadius: "4rem" }}
      />
      <LoadingModal show={loading} />
    </div>
  );
}

export default AddPricing;
