import React from "react";
import { Modal, Button } from "react-bootstrap";

function SuccessModal({
  show,
  title = "Success",
  message = "Action completed successfully.",
  onClose,
  okLabel = "OK",
}) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          {okLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessModal;
