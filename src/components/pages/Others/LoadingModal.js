import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const LoadingModal = (props) => {
  return (
    <Modal show={props.show} centered className="loading-modal">
      <div className="my-4 py-4 d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="primary" />{" "}
        <span className="fs-5 ms-1">Loading...</span>
      </div>
    </Modal>
  );
};

export default LoadingModal;
