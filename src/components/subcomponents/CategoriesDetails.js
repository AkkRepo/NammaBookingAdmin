import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form, FloatingLabel, Image, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesService } from "../../services/Categories";
import { Capitalize } from "../../core/utils";
import { Loading } from "../pages/Others/Index";

function CategoriesDetailsModal({ show, onHide, category }) {
  const { id } = useParams();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [openImage, setImage] = useState("");
  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await CategoriesService.getCategoriesById(id);
      if (res.status === 200) {
        setCategories(res.data);
        if (res.data?.images?.length > 0) {
          setImage(res.data.images[0].imageUrl);
        }
      } else {
        alert(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (show) {
      getCategories({
        id: category.id,
        category: category.category,
        imageUrl: category.imageUrl,
      });
    }
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="md-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {category?.id && !loading && (
              <p className="brownbear view-details-heading-style heading-color">
                {category.category}
              </p>
            )}
          </Modal.Title>
        </Modal.Header>

        <br />

        <div>
          {category.imageUrl && (
            <div style={{ textAlign: "center" }}>
              <Image
                //rounded
                className="view-details-image-style"
                src={category.imageUrl}
                alt="Selected"
                style={{ width: "25rem", height: "17rem" }}
                loading="lazy"
              />
            </div>
          )}
        </div>
        <br />

        {/*
        <Modal.Footer>
          <Row>
            <Col>
              <Button onClick={onHide} className="custom-btn">
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

function CategoriesDetails(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <FontAwesomeIcon
        icon={faCircleInfo}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <CategoriesDetailsModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        category={props.category}
      />
    </>
  );
}

export default CategoriesDetails;
