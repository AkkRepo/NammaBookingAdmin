import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNav from "../header/AppNav";
import { StaysService } from "../../services/Stays";
import { LoadingModal } from "../pages/Others/Index";

function Multiple() {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [stays, setStays] = useState({
    rating: undefined,
  });

  const [addError, setAddError] = useState({
    rating: "",
  });

  const handleRatingChange = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,1}$/; // Allows numbers with up to one decimal place

    if (regex.test(value) || value === "") {
      setRating(value);
      setStays({ ...stays, rating: value });
      setError("");
    } else {
      setError("Please enter a valid rating with one decimal place.");
    }
  };

  const validation = () => {
    let tempError = {
      rating: "",
    };
    let valid = true;
    if (!stays.rating || stays.rating <= 0) {
      tempError.rating = "Rating is required";
      valid = false;
    }

    setAddError(tempError);
    return valid;
  };

  const submitStays = () => {
    if (validation()) {
      addStays();
    }
  };

  const addStays = async () => {
    setLoading(true);
    try {
      const res = await StaysService.addStays({
        ...stays,
        rating: Number(stays.rating),
      });
      if (res.status === 200) {
        alert(res.message);
        navigate("/stays");
      } else {
        alert("Else error");
      }
      setLoading(false);
    } catch (error) {
      alert("Catch error");
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitStays();
  };

  return (
    <div>
      <header id="header">
        <AppNav />
      </header>

      <h1 className="brownbear stays-h1 heading-color">Add New Stay</h1>

      <Form onSubmit={handleSubmit}>
        <p
          style={{
            fontSize: "13px",
            paddingLeft: "63rem",
          }}
        >
          (*) marked fields are compulsory
        </p>
        <Container>
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Stay's Basic Details
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="rating"
                  label="Rating*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Rating"
                    value={rating}
                    onChange={handleRatingChange}
                    isInvalid={!!error || !!addError.rating}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error ? error : addError.rating}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
          <br />
          <Row>
            <Col>
              <br />
              <Button
                type="submit"
                className="custom-btn"
                style={{ marginRight: "1rem" }}
              >
                Submit
              </Button>
              <Button className="custom-btn" type="reset">
                Clear
              </Button>
            </Col>
          </Row>
        </Container>
        <br />
      </Form>
      <LoadingModal show={loading} />
    </div>
  );
}

export default Multiple;
