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

function EditPricing(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const [pricing, setPricing] = useState({
    id: 0,
    packageName: "",
    packageDetails: "",
    price: "",
    offerPrice: "",
  });

  const [error, setError] = useState({
    packageName: "",
    packageDetails: "",
    price: "",
  });

  const validation = () => {
    let tempError = {
      packageName: "",
      packageDetails: "",
      price: "",
    };
    let valid = true;
    if (!pricing.packageName) {
      tempError.packageName = "Required Field";
      valid = false;
    }
    if (!pricing.packageDetails) {
      tempError.packageDetails = "Required Field";
      valid = false;
    }
    if (!pricing.price) {
      tempError.price = "Required Field";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.updatePricing({
          id: pricing.id,
          packageName: pricing.packageName,
          packageDetails: pricing.packageDetails,
          price: pricing.price,
          offerPrice: pricing.offerPrice === "" ? "0" : pricing.offerPrice,
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
    setPricing({ ...props.price });
  }, [props.price]);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>Edit Pricing</h5>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="packageName"
            label="Package Name*"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Package Name"
              className="text-capitalize"
              value={pricing.packageName}
              onChange={(e) =>
                setPricing({ ...pricing, packageName: e.target.value })
              }
              isInvalid={!!error.packageName}
            />
            <p className="required-field-meassage">{error.packageName}</p>
          </FloatingLabel>
          <FloatingLabel
            controlId="packageDetails"
            label="Package Details*"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Package Details"
              className="text-capitalize"
              value={pricing.packageDetails}
              onChange={(e) =>
                setPricing({ ...pricing, packageDetails: e.target.value })
              }
              isInvalid={!!error.packageDetails}
            />
            <p className="required-field-meassage">{error.packageDetails}</p>
          </FloatingLabel>
          <FloatingLabel
            controlId="actualprice"
            label="Actual Price*"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="actualprice"
              className="text-capitalize"
              value={pricing.price}
              onChange={(e) =>
                setPricing({ ...pricing, price: e.target.value })
              }
              isInvalid={!!error.price}
            />
            <p className="required-field-meassage">{error.price}</p>
          </FloatingLabel>
          <FloatingLabel
            controlId="offerprice"
            label="Offer Price*"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Offer Price"
              className="text-capitalize"
              value={pricing.offerPrice}
              onChange={(e) =>
                setPricing({ ...pricing, offerPrice: e.target.value })
              }
            />
          </FloatingLabel>
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

export default EditPricing;
