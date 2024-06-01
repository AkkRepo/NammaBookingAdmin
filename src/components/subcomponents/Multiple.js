import React, { useState } from "react";
import { Form, FloatingLabel, Row, Col, Container } from "react-bootstrap";

function Multiple() {
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");

  const handleRatingChange = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,1}$/; // Allows numbers with up to one decimal place

    if (regex.test(value) || value === "") {
      setRating(value);
      setError("");
    } else {
      setError("Please enter a valid rating with one decimal place.");
    }
  };

  return (
    <div>
      <Form>
        <Container>
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Stay's Basic Details
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="rating"
                  label="Rating"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Rating"
                    value={rating}
                    onChange={handleRatingChange}
                    isInvalid={!!error}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
          <br />
        </Container>
        <br />
      </Form>
    </div>
  );
}

export default Multiple;
