import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CategoriesService } from "../../services/Categories";
import { LoadingModal } from "../pages/Others/Index";

function AddCategories(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({
    category: "",
    imageUrl: "",
  });
  const [error, setError] = useState({
    category: "",
    imageUrl: "",
  });

  const validation = () => {
    let tempError = {
      category: "",
      imageUrl: "",
    };
    let valid = true;
    if (!categories.category || !categories.category.match(/^[a-zA-Z'" ]*$/)) {
      tempError.category =
        "Category is required and should contain only letters and inverted commas";
      valid = false;
    }
    if (!categories.imageUrl) {
      tempError.imageUrl = "Image is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategories({ ...categories, imageUrl: reader.result.split(",")[1] });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitCategories = () => {
    if (validation()) {
      addCategories();
    }
  };

  const addCategories = async () => {
    setLoading(true);
    try {
      const res = await CategoriesService.addCategories(categories);
      if (res.status === 200) {
        alert(res.message);
        setCategories({ category: "", imageUrl: "" }); // Clear the form
        // setError({ category: "", imageUrl: "" }); // Clear errors
        props.onHide();
        props.onClose();
        navigate("/categories");
      } else {
        alert("Error while Adding");
      }
      setLoading(false);
    } catch (error) {
      alert("Error while adding category");
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Category
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <FloatingLabel
                controlId="category"
                label="Add Category"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Add Category"
                  value={categories.category}
                  onChange={(e) =>
                    setCategories({ ...categories, category: e.target.value })
                  }
                  isInvalid={!!error.category}
                />
              </FloatingLabel>
              {error.category && (
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "-10px",
                    color: "red",
                  }}
                >
                  {error.category}
                </p>
              )}
              <FloatingLabel
                controlId="categoryImage"
                label="Add Image"
                className="mb-3"
              >
                <Form.Control
                  type="file"
                  placeholder="Add Image"
                  multiple={false}
                  onChange={handleImageChange}
                  isInvalid={!!error.imageUrl}
                />
              </FloatingLabel>
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "-10px",
                  color: "#e77225",
                }}
              >
                (Maximum one image is allowed)
              </p>
            </Col>
            <Col>
              <div style={{ marginLeft: "2rem" }}>
                {categories.imageUrl && (
                  <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <Image
                      rounded
                      src={`data:image/jpeg;base64,${categories.imageUrl}`}
                      alt="Uploaded"
                      style={{ width: "20rem", height: "12rem" }}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
        <hr style={{ color: "grey" }} />
        <Row style={{ paddingBottom: "1rem" }}>
          <Col style={{ paddingLeft: "2rem" }}>
            <Button onClick={submitCategories} className="custom-btn">
              Add
            </Button>
          </Col>
          <Col style={{ paddingRight: "2rem", marginLeft: "-1rem" }}>
            <Button onClick={props.onHide} className="custom-btn">
              Cancel
            </Button>
          </Col>
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
        </Row>
      </Modal>
      <LoadingModal show={loading} />
    </>
  );
}

export default AddCategories;
