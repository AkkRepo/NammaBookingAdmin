import React, { useEffect, useState } from "react";

//css
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
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
//page
import AppNav from "../header/AppNav";
import { Capitalize } from "../../core/utils";
import { useNavigate } from "react-router-dom";
import { StaysService } from "../../services/Stays";

function TestingFile() {
  const [newRoom, setRooms] = useState("");
  const [newRoomType, setNewRoomType] = useState("");
  //Pricing multiple input start
  const addNewRoom = () => {
    // Check if newRoom is not empty
    if (newRoom) {
      let list = pricingInputData.roomDetails;
      list.push(newRoom);
      setPricingInputData({
        ...pricingInputData,
        roomDetails: list,
      });
      setRooms(""); // Assuming setRooms is used to clear the newRoom input
      console.log(pricingInputData);
    } else {
      // Handle the case where newRoom is empty
      alert("No room data provided. Please enter the room details.");
      // You can also set an error state and display it in your UI
      // setError("No room data provided. Please enter the room details.");
    }
  };

  const [pricingInputData, setPricingInputData] = useState({
    roomsName: "",
    price: "",
    packageIncludes: "",
    roomDetails: [
      {
        noOfRooms: undefined,
        roomType: "",
      },
    ],
    //noOfRooms: [],
    //roomType: [],
    noOfGuests: "",
  });

  const [pricingInputArr, setPricingInputArr] = useState([]);
  let {
    roomsName,
    price,
    packageIncludes,
    roomDetails,
    //noOfRooms,
    //roomType,
    noOfGuests,
  } = pricingInputData;
  function addData() {
    // Check if any of the fields are empty
    if (
      !roomsName ||
      !price ||
      !packageIncludes ||
      !roomDetails ||
      //!(noOfRooms.length > 0) ||
      //!roomType ||
      !noOfGuests
    ) {
      alert("All fields are required");
      return;
    }

    // Add data to the array
    setPricingInputArr([
      ...pricingInputArr,
      {
        roomsName,
        price,
        packageIncludes,
        //noOfRooms,
        //roomType,
        roomDetails,
        noOfGuests,
      },
    ]);

    // Reset input fields
    setPricingInputData({
      roomsName: "",
      price: "",
      packageIncludes: "",
      roomDetails: [
        {
          noOfRooms: undefined,
          roomType: "",
        },
      ],
      //noOfRooms: [],
      //roomType: [],
      noOfGuests: "",
    });
  }
  function pricingDeleteData(i) {
    console.log(i, "this index row wants to be deleted");
    let total1 = [...pricingInputArr];
    total1.splice(i, 1);
    setPricingInputArr(total1);
  }
  //Pricing multiple input end

  //post operation
  const navigate = useNavigate();
  const [stays, setStays] = useState({
    accommodationTypesDetails: [],
  });

  const [addError, setAddError] = useState({
    accommodationTypesDetails: "",
  });
  const validation = () => {
    let tempError = {
      accommodationTypesDetails: "",
    };
    let valid = true;
    if (pricingInputArr.length === 0) {
      tempError.accommodationTypesDetails = "Accomodation Type is required";
      valid = false;
    }

    setAddError(tempError);
    return valid;
  };
  const submitStays = () => {
    if (validation() || true) {
      addStays();
    }
  };
  const addStays = async () => {
    try {
      const res = await StaysService.addStays({
        ...stays,
        accommodationTypesDetails: pricingInputArr.map((x) => ({
          roomName: x.roomsName,
          price: x.price,
          includedPackages: x.packageIncludes,
          noOfGuests: x.noOfGuests,
          roomDetails: x.roomDetails,
          //roomDetails: [
          // {
          //  noOfRooms: 1,
          //  roomType: "a",
          // },
          //],
        })),
      });
      if (res.status === 200) {
        alert("Stays Added");
        navigate("/dashboard/addStays");
      } else {
        alert("Else error");
      }
    } catch (error) {
      alert("Catch error");
      console.log(error);
    }
  };

  return (
    <div>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "6rem" }} />
      <h1 className="brownbear stays-h1 heading-color">Add New Stay</h1>

      <Form>
        <p
          style={{
            fontSize: "13px",
            //fontWeight: "bold",
            //textAlign: "right",
            //marginLeft: "-6rem",
            paddingLeft: "63rem",
          }}
        >
          (*) marked fields are compulsory
        </p>
        <Container>
          <br />
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Accomodation Types
              <p className="required-field-meassage">
                {addError.accommodationTypesDetails}
              </p>
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="roomsName"
                  label="Room Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    style={{ textTransform: "capitalize" }}
                    value={pricingInputData.roomsName}
                    onChange={(e) => {
                      setPricingInputData({
                        ...pricingInputData,
                        roomsName: Capitalize(e.target.value),
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="price" label="Price" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Price"
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
              </Col>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="packageIncludes"
                    label="Package Includes"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      style={{ textTransform: "capitalize" }}
                      value={pricingInputData.packageIncludes}
                      onChange={(e) => {
                        setPricingInputData({
                          ...pricingInputData,
                          packageIncludes: e.target.value,
                        });
                      }}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="noOfRooms"
                    label="Total no. of Rooms"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="No. of Rooms"
                      style={{ textTransform: "capitalize" }}
                      value={newRoom}
                      onChange={(e) => {
                        setRooms(e.target.value);
                      }}
                    />
                  </FloatingLabel>

                  <Button onClick={addNewRoom} className="custom-btn">
                    Add room
                  </Button>
                  <Container
                    style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                  >
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Rooms</th>
                          <th>Room type</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pricingInputData?.roomDetails?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.noOfRooms}</td>
                            <td>{item.roomType}</td>
                            <td>
                              <FontAwesomeIcon
                                icon={faX}
                                onClick={() => {
                                  let list = pricingInputData.roomDetails;
                                  list.splice(index, 1);
                                  setPricingInputData({
                                    ...pricingInputData,
                                    roomDetails: list,
                                  });
                                  console.log(pricingInputData);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Container>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="roomType"
                    label="Room Type"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Room type"
                      style={{ textTransform: "capitalize" }}
                      value={newRoom}
                      onChange={(e) => {
                        setRooms(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="noOfGuests"
                    label="No. of Guests"
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
                </Col>
                <Col>
                  <Button onClick={addData} className="custom-btn-reverse">
                    Add Accomodation Types
                  </Button>
                </Col>
              </Row>
              <Container style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Package Includes</th>
                      <th>Number of Rooms</th>
                      <th>Room Type</th>
                      <th>Number of Guests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingInputArr.map((info, i) => {
                      return (
                        <tr>
                          <td>{info.roomsName}</td>
                          <td>{info.price}</td>
                          <td>{info.packageIncludes}</td>
                          <td>{info.noOfRooms.join(",")}</td>
                          <td>{info.roomType.join(",")}</td>
                          <td>{info.noOfGuests}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => pricingDeleteData(i)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
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
                onClick={submitStays}
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
    </div>
  );
}

export default TestingFile;
