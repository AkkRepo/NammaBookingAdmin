import React from "react";
import { Spinner } from "react-bootstrap";
const Loading = () => {
  return (
    <div className="my-5 py-4 d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="primary" />{" "}
      <span className="fs-5 ms-1">Loading...</span>
    </div>
  );
};
export default Loading;
