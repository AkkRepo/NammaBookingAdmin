import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesService } from "../../services/Categories";
import { LoadingModal } from "../pages/Others/Index";

function EditCategoriesModal({ show, onHide, category }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({
    id: undefined,
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
    if (!categories.category) {
      tempError.category = "Category is required";
      valid = false;
    }
    if (!categories.imageUrl) {
      tempError.imageUrl = "Image is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await CategoriesService.updateCategories({
          ...categories,
          imageUrl: image ? categories.imageUrl.slice(23) : null,
        });
        if (res.status === 200) {
          alert(res.message);
          onHide();
          navigate("/categories");
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
    if (show) {
      setCategories({
        id: category.id,
        category: category.category,
        imageUrl: category.imageUrl,
      });
    }
  }, [show]);

  //Image base64
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        //console.log("Base64 String:", base64String);
        const slicedString = base64String.slice(23);
        console.log(base64String);
        console.log("Sliced String:", slicedString);
        setCategories({ ...categories, imageUrl: base64String });
        setImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Categories
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex" }}>
          <div style={{ padding: "1rem" }}>
            <FloatingLabel
              controlId="editCategories"
              label="Edit Category*"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Edit Categories"
                value={categories.category}
                onChange={(e) =>
                  setCategories({ ...categories, category: e.target.value })
                }
                isInvalid={!!error.category}
              />
              <p>{error.category}</p>
            </FloatingLabel>
            <FloatingLabel
              controlId="categoryImage"
              label="Edit Image"
              className="mb-3"
            >
              <Form.Control
                type="file"
                placeholder="Edit Image"
                multiple={false}
                //value={categories.imageUrl}
                onChange={handleImageChange}
                isInvalid={!!error.imageUrl}
              />
              <p>{error.imageUrl}</p>
            </FloatingLabel>
          </div>
          <div style={{ marginLeft: "2rem" }}>
            {categories.imageUrl && (
              <div style={{ textAlign: "center" }}>
                <Image
                  rounded
                  src={categories.imageUrl}
                  alt="Selected"
                  style={{ width: "20rem", height: "12rem" }}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <hr style={{ color: "grey" }} />
        <Row style={{ paddingBottom: "1rem" }}>
          <Col style={{ paddingLeft: "2rem" }}>
            <Button onClick={update} className="custom-btn">
              Update
            </Button>
          </Col>
          <Col style={{ paddingRight: "2rem", marginLeft: "-1rem" }}>
            <Button onClick={onHide} className="custom-btn">
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

function EditCategories(props) {
  const [modalShow, setModalShow] = useState(false);
  const [categories, setCategories] = useState({
    id: undefined,
    category: "",
    imageUrl: "",
  });
  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <EditCategoriesModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          props.onClose();
        }}
        category={props.category}
      />
    </>
  );
}

export default EditCategories;
