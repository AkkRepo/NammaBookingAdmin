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
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Capitalize } from "../../../core/utils";
import { StaysService } from "../../../services/Stays";
import { LoadingModal } from "../../pages/Others/Index";
import { BedTypeServices } from "../../../services/BedType";

function AddAccomodationTypes(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);

  //Accomodation multiple input start
  const [newRoom, setRooms] = useState({
    noOfBeds: "",
    bedTypeId: "",
    //bedType: "",
  });
  const addNewBedDetails = () => {
    if (newRoom.noOfBeds && newRoom.noOfBeds > 0 && newRoom.bedTypeId) {
      let list = pricingInputData.bedDetails;
      list.push(newRoom);
      setPricingInputData({
        ...pricingInputData,
        bedDetails: list,
      });
      setRooms({ noOfBeds: "", bedTypeId: "" });
      console.log(pricingInputData);
    } else {
      console.log(newRoom);
      alert("No bed data provided. Please enter valid bed details.");
    }
  };
  const deleteNewRoom = (ind) => {
    let list = pricingInputData.bedDetails;
    list.splice(ind, 1);
    setPricingInputData({
      ...pricingInputData,
      bedDetails: list,
    });

    console.log(pricingInputData);
  };
  const [pricingInputData, setPricingInputData] = useState({
    roomName: "",
    roomType: "",
    bedDetails: [],
    noOfRooms: "",
    noOfGuests: "",
  });
  const addAccomodationDetails = async () => {
    setLoading(true);
    try {
      const res = await StaysService.addAccomodationTypes({
        stayId: props.id,
        roomName: pricingInputData.roomName,
        roomType: pricingInputData.roomType,
        noOfRooms: pricingInputData.noOfRooms,
        noOfGuests: pricingInputData.noOfGuests,
        bedDetails: pricingInputData.bedDetails.map((x) => ({
          noOfBeds: x.noOfBeds,
          bedTypeId: x.bedTypeId,
        })),
      });
      if (res.status === 200) {
        setPricingInputData({
          roomName: "",
          noOfRooms: "",
          noOfGuests: "",
        });
        alert("Accomodation added successfully");
        props.onUpdate();
        handleClose();
      } else {
        console.log(pricingInputData);
        alert("All fields are required");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  //Bed Type start
  const [bedType, setBedType] = useState([]);
  const getBedType = async () => {
    try {
      const res = await BedTypeServices.getAllBedTypes();
      if (res.data?.length > 0) {
        setBedType(res.data);
      } else {
        setBedType([]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getBedType();
  }, []);
  //Bed Type end

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Accomodation Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FloatingLabel
                controlId="roomName"
                label="Room Name*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="text-capitalize"
                  value={pricingInputData.roomName}
                  onChange={(e) => {
                    setPricingInputData({
                      ...pricingInputData,
                      roomName: Capitalize(e.target.value),
                    });
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="roomType"
                label="Room Type"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Room Type"
                  className="text-capitalize"
                  value={pricingInputData.roomType}
                  onChange={(e) => {
                    setPricingInputData({
                      ...pricingInputData,
                      roomType: Capitalize(e.target.value),
                    });
                  }}
                />{" "}
              </FloatingLabel>
            </Col>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="noOfRooms"
                  label="Total no. of Rooms*"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    min={"0"}
                    placeholder="No. of Rooms"
                    style={{ textTransform: "capitalize" }}
                    value={pricingInputData.noOfRooms}
                    onChange={(e) => {
                      setPricingInputData({
                        ...pricingInputData,
                        noOfRooms: e.target.value,
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="noOfGuests"
                  label="Total no. of Guests*"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    min={"0"}
                    placeholder="No. of Guests"
                    style={{ textTransform: "capitalize" }}
                    value={pricingInputData.noOfGuests}
                    onChange={(e) => {
                      setPricingInputData({
                        ...pricingInputData,
                        noOfGuests: e.target.value,
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="Bed Type" label="Bed Type*">
                  <Form.Select
                    required
                    aria-label="Bed Type*"
                    value={newRoom.bedTypeId}
                    onChange={(e) => {
                      setRooms({
                        ...newRoom,
                        bedTypeId: Number(e.target.value),
                      });
                    }}
                  >
                    <option>Select</option>
                    {bedType.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.bedType}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col style={{ display: "flex" }}>
                <FloatingLabel
                  controlId="noOfBeds"
                  label="Total no. of Beds*"
                  className="mb-3"
                  style={{ width: "17rem" }}
                >
                  <Form.Control
                    type="number"
                    min={"0"}
                    placeholder="noOfBeds"
                    style={{ textTransform: "capitalize" }}
                    value={newRoom.noOfBeds}
                    onChange={(e) => {
                      setRooms({
                        ...newRoom,
                        noOfBeds: Number(e.target.value),
                      });
                    }}
                  />
                </FloatingLabel>
                <div
                  style={{
                    paddingLeft: "1rem",
                    paddingTop: "0.5rem",
                    width: "5rem",
                  }}
                >
                  <Button
                    onClick={addNewBedDetails}
                    className="custom-btn"
                    style={{ height: "3rem" }}
                  >
                    Add
                  </Button>
                </div>
              </Col>
            </Row>
            <Container style={{ paddingRight: "8rem" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Bed type</th>
                    <th>No. of Beds</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingInputData?.bedDetails?.map((item, index) => {
                    const bedTypeName =
                      bedType.find((type) => type.id === item.bedTypeId)
                        ?.bedType || "Unknown";

                    return (
                      <tr key={index}>
                        <td>{bedTypeName}</td>
                        <td>{item.noOfBeds}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => deleteNewRoom(index)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Container>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn" onClick={addAccomodationDetails}>
            Add
          </Button>
          <Button className="custom-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <FontAwesomeIcon
        icon={faPlus}
        onClick={handleShow}
        size="lg"
        className="stay-edit-button"
        style={{ padding: "10px", borderRadius: "4rem" }}
      />
      <LoadingModal show={loading} />
    </div>
  );
}

export default AddAccomodationTypes;
