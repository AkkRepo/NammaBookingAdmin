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
import AddAmenities from "./AddAmenities";
import { LoadingModal } from "../../pages/Others/Index";

function AddAccomodationTypes(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);

  //Accomodation multiple input start
  const [newRoom, setRooms] = useState({
    noOfBeds: "",
    bedType: "",
  });
  const addNewBedDetails = () => {
    if (newRoom.noOfBeds && newRoom.bedType) {
      let list = pricingInputData.bedDetails;
      list.push(newRoom);
      setPricingInputData({
        ...pricingInputData,
        bedDetails: list,
      });
      setRooms({ noOfBeds: "", bedType: "" });
      console.log(pricingInputData);
    } else {
      alert("No bed data provided. Please enter the bed details.");
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
    bedDetails: [],
    noOfRooms: "",
    //price: "",
    //packageIncludes: "",
    //selectacc: "",
    //roomType: [],
    //noOfGuests: "",
  });
  const addAccomodationDetails = async () => {
    setLoading(true);
    //if (validation()) {
    try {
      const res = await StaysService.addAccomodationTypes({
        stayId: props.id,
        roomName: pricingInputData.roomName,
        //price: pricingInputData.price + " " + pricingInputData.selectacc,
        //includedPackages: pricingInputData.packageIncludes,
        //noOfGuests: pricingInputData.noOfGuests,
        noOfRooms: pricingInputData.noOfRooms,
        bedDetails: pricingInputData.bedDetails.map((x) => ({
          noOfBeds: x.noOfBeds,
          bedType: x.bedType,
        })),
      });
      if (res.status === 200) {
        setPricingInputData({
          roomName: "",
          bedDetails: [],
          noOfRooms: "",
        });
        alert("Accomodation added successfully");
        props.onUpdate();
        handleClose();
      } else {
        alert("All fields are required");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
    //}
  };
  const [addError, setAddError] = useState({
    pricingInputData,
  });
  const validation = () => {
    let tempError = {
      pricingInputData,
    };
    let valid = true;
    if (!pricingInputData) {
      tempError.roomName = "required";
      valid = false;
    }
  };

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
                  //isInvalid={!!addError.roomName}
                />{" "}
                {/* <p className="required-field-meassage">{addError.roomName}</p> */}
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="noOfRooms"
                label="Total no. of Rooms*"
                className="mb-3"
              >
                <Form.Control
                  type="number"
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
            {/* <Col>
              <FloatingLabel controlId="price" label="Price" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Price*"
                  style={{ textTransform: "capitalize" }}
                  value={pricingInputData.price}
                  onChange={(e) => {
                    setPricingInputData({
                      ...pricingInputData,
                      price: e.target.value,
                    });
                  }}
                />
              </FloatingLabel>
            </Col>{" "}
            <Col>
              <FloatingLabel controlId="selectacc" label="Select*">
                <Form.Select
                  aria-label="Select*"
                  value={pricingInputData.selectacc}
                  onChange={(e) =>
                    setPricingInputData({
                      ...pricingInputData,
                      selectacc: e.target.value,
                    })
                  }
                  //isInvalid={!!addError.selectacc}
                >
                  <option>Select</option>
                  <option value="Price / Per Person">Price / Per Person</option>
                  <option value="Price / Per Room">Price / Per Room</option>
                </Form.Select>
                <p className="required-field-meassage">
                    {addError.selectacc}
                  </p> 
              </FloatingLabel>
            </Col> */}
            <Row>
              {/* <Col>
                <FloatingLabel
                  controlId="noOfGuests*"
                  label="Total no. of Guests"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
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
              </Col> */}
            </Row>
            <Row>
              {/* <Col>
                <FloatingLabel
                  controlId="packageIncludes"
                  label="Package Includes*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="text-capitalize"
                    value={pricingInputData.packageIncludes}
                    onChange={(e) => {
                      setPricingInputData({
                        ...pricingInputData,
                        packageIncludes: Capitalize(e.target.value),
                      });
                    }}
                  />
                </FloatingLabel>
              </Col> */}
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="bedType"
                  label="Bed Type*"
                  className="mb-3"
                  style={{ width: "20rem" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Room type"
                    className="text-capitalize"
                    value={newRoom.bedType}
                    onChange={(e) => {
                      setRooms({
                        ...newRoom,
                        bedType: Capitalize(e.target.value),
                      });
                    }}
                  />
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
                    placeholder="No. of Rooms"
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
                  {pricingInputData?.bedDetails?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.bedType}</td>
                      <td>{item.noOfBeds}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => deleteNewRoom(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
            {/* <Row>
              <Col>
                <Button onClick={addAccomodationDetails} className="custom-btn">
                  Add Accomodation Types
                </Button>
              </Col>
            </Row> */}
            {/* <Container
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "1rem",
              }}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Room Name</th>
                    <th>Price</th>
                    <th>No. of Rooms</th>
                    <th>No. of Guests</th>
                    <th>Package Includes</th>
                    <th>No Of Beds</th>
                    <th>Bed Type</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingInputArr.map((info, i) => {
                    return (
                      <tr>
                        <td>{info.roomName}</td>
                        
                          <td>{info.price + " " + info.selectacc}</td> 
                        <td>{info.price + " " + info.selectacc}</td>
                        <td>{info.noOfRooms}</td>
                        <td>{info.noOfGuests}</td>
                        <td>{info.packageIncludes}</td>
                        <td>
                          {info.bedDetails.map((x) => x.noOfBeds).join(",")}
                        </td>
                        <td>
                          {info.bedDetails.map((x) => x.bedType).join(",")}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => pricingDeleteData(i)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Container> */}
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
