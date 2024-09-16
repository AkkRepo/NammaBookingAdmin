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

function EditChildrensPayment(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const [childrensPayment, setChildrensPayment] = useState({
    id: 0,
    label: "",
    details: "",
  });

  const [error, setError] = useState({
    label: "",
    details: "",
  });

  const validation = () => {
    let tempError = {
      label: "",
      details: "",
    };
    let valid = true;
    if (!childrensPayment.label) {
      tempError.label = "Required Field";
      valid = false;
    }
    if (!childrensPayment.details) {
      tempError.details = "Required Field";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.updateChildrensPayment({
          id: childrensPayment.id,
          label: childrensPayment.label,
          details: childrensPayment.details,
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
    setChildrensPayment({ ...props.childrensPayment });
    console.log(props.childrensPayment);
  }, [props.childrensPayment]);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>Edit Children'S Payment data</h5>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="Label" label="Label*" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Label"
              className="text-capitalize"
              value={childrensPayment.label}
              onChange={(e) =>
                setChildrensPayment({
                  ...childrensPayment,
                  label: Capitalize(e.target.value),
                })
              }
              isInvalid={!!error.label}
            />
            <p className="required-field-meassage">{error.label}</p>
          </FloatingLabel>
          <FloatingLabel controlId="Details" label="Details*" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Details"
              value={childrensPayment.details}
              onChange={(e) =>
                setChildrensPayment({
                  ...childrensPayment,
                  details: e.target.value,
                })
              }
              isInvalid={!!error.details}
            />
            <p className="required-field-meassage">{error.details}</p>
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

export default EditChildrensPayment;
