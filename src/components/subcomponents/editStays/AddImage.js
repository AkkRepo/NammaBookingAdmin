import React, { useState } from "react";
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

function AddImage(props) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [imgfile, setFile] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImageBase64 = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };
  const addImage = async () => {
    try {
      const res = await StaysService.addImage({
        stayId: props.id,
        image: image,
      });
      if (res.status === 200) {
        setImage("");
        setFile();
        alert("Image added successfully");
        props.onUpdate();
        handleClose();
      } else {
        alert("All Fields are required");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <h5>Add Image</h5>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="categoryImage"
            label="Add Image"
            className="mb-3"
          >
            <Form.Control
              type="file"
              placeholder="Add Image"
              multiple={false}
              value={imgfile?.filename}
              onChange={handleImageBase64}
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
          {image && (
            <div
              style={{
                display: "inline-block",
                position: "relative",
                margin: "10px",
              }}
            >
              <Image
                src={`data:image/jpeg;base64,${image}`}
                style={{ width: "200px", height: "auto" }}
                thumbnail
                loading="lazy"
              />
              <Button
                variant="danger"
                size="sm"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
                onClick={() => setImage("")}
              >
                Cancel
              </Button>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button className="custom-btn" onClick={addImage}>
            Add
          </Button>
          <Button className="custom-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <FontAwesomeIcon
        icon={faPlus}
        size="lg"
        onClick={handleShow}
        className="stay-edit-button"
        style={{ padding: "8px", borderRadius: "5rem" }}
      />
    </div>
  );
}

export default AddImage;
