import React, { useState } from "react";

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
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
//page
import AppNav from "../header/AppNav";

function EditStays() {
  const [rating, setRating] = useState(0); // Initialize rating state

  // Function to handle rating change
  const handleRatingChange = (e) => {
    const value = parseFloat(e.target.value); // Parse the input value to float
    setRating(value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, e.g., sending rating to server
    console.log("Submitted rating:", rating);
    // Reset the rating after submission
    setRating(0);
  };

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Add newly selected images to the existing images array
    setImages([...images, ...files]);
  };

  //near by places multiple input start
  let [array1, setArray1] = useState([]);
  let [inputData1, setInputData1] = useState({ nearByPlaces: "" });
  function data1(e) {
    setInputData1({ ...array1, nearByPlaces: e.target.value });
  }
  let nearByPlaces = inputData1;
  function addInputData1() {
    setArray1([...array1, nearByPlaces]);
    console.log(inputData1);
    setInputData1({ nearByPlaces: "" });
  }

  console.log("total array: ", array1);

  function deleteData1(i) {
    console.log(i, "this index row wants to be deleted");
    let total1 = [...array1];
    total1.splice(i, 1);
    setArray1(total1);
  }
  //near by places myltiple input end

  //terms and condition multiple input start
  let [array2, setArray2] = useState([]);
  let [inputData2, setInputData2] = useState({ termsAndCondition: "" });
  function data2(e) {
    setInputData2({ ...array2, termsAndCondition: e.target.value });
  }
  let termsAndCondition = inputData2;
  function addInputData2() {
    setArray2([...array2, termsAndCondition]);
    console.log(inputData2);
    setInputData2({ termsAndCondition: "" });
  }

  console.log("total array: ", array2);

  function deleteData2(i) {
    console.log(i, "this index row wants to be deleted");
    let total2 = [...array2];
    total2.splice(i, 1);
    setArray2(total2);
  }

  //terms and condition multiple input end

  //Accomodation multiple input start
  const [accInputData, setAccInputData] = useState({
    accomodation: "",
    noOfPeople: "",
    noOfBeds: "",
  });

  //function accChangeHandle(e) {
  //setAccInputData({ accInputData, [e.target.accomodation]: e.target.value });
  //}

  const [accInputArr, setAccInputArr] = useState([]);
  let { accomodation, noOfPeople, noOfBeds } = accInputData;
  function addData() {
    setAccInputArr([...accInputArr, { accomodation, noOfPeople, noOfBeds }]);
    console.log(accInputArr);
    console.log(accInputData);
    setAccInputData({ accomodation: "", noOfPeople: "", noOfBeds: "" });
  }

  function accDeleteData(i) {
    console.log(i, "this index row wants to be deleted");
    let total1 = [...accInputArr];
    total1.splice(i, 1);
    setAccInputArr(total1);
  }
  //Accomodation multiple input end

  return (
    <div>
      <header id="header">
        <AppNav />
      </header>
      
      <h1 className="brownbear stays-h1 heading-color">Edit Stay</h1>

      <Form onSubmit={handleSubmit}>
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
          <Row>
            <Col>
              <FloatingLabel
                controlId="stayName"
                label="Stay Name*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Please enter Stay name"
                  style={{ textTransform: "capitalize" }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="stayLocation"
                label="Location*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Please enter Location"
                  style={{ textTransform: "capitalize" }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="formRating"
                label="Rating"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="0.1" // Allow decimal steps with one digit after the decimal point
                  min="0" // Set minimum value
                  max="5" // Set maximum value
                  value={rating}
                  onChange={handleRatingChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3 checkbox-border" controlId="category">
                <Form.Label>Category*</Form.Label>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`}>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`One`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Two`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Three`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Four`}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <h6 style={{ paddingTop: "1rem" }}>Accomodation Type:</h6>
            </Col>
            <Col>
              <FloatingLabel
                controlId="accomodation"
                label="Accomodation"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Accomodation"
                  style={{ textTransform: "capitalize" }}
                  value={accInputData.accomodation}
                  onChange={(e) => {
                    setAccInputData({
                      ...accInputData,
                      accomodation: e.target.value,
                    });
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="noOfPeople" label="Number of People">
                <Form.Select
                  aria-label="Number of People"
                  value={accInputData.noOfPeople}
                  onChange={(e) => {
                    setAccInputData({
                      ...accInputData,
                      noOfPeople: e.target.value,
                    });
                  }}
                >
                  <option>Select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="noOfBeds" label="Number of Beds">
                <Form.Select
                  aria-label="Number of Beds"
                  value={accInputData.noOfBeds}
                  onChange={(e) => {
                    setAccInputData({
                      ...accInputData,
                      noOfBeds: e.target.value,
                    });
                  }}
                >
                  <option>Select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <Button onClick={addData} className="custom-btn-reverse">
                Add
              </Button>
            </Col>
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Accomodation</th>
                    <th>No. of People</th>
                    <th>No. of Beds</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {accInputArr.map((info, i) => {
                    return (
                      <tr>
                        <td>{info.accomodation}</td>
                        <td>{info.noOfPeople}</td>
                        <td>{info.noOfBeds}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faX}
                            onClick={() => accDeleteData(i)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Container>
          </Row>
          <br />
          {/*
          <Row>
            <Col>
              <FloatingLabel controlId="guests" label="Guests" className="mb-3">
                <Form.Control type="number" placeholder="Guests" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="noOfBeds"
                label="No of beds"
                className="mb-3"
              >
                <Form.Control type="number" placeholder="No of beds" />
              </FloatingLabel>
            </Col>
          </Row> */}
          <Row>
            <Col>
              <Form.Group
                className="mb-3 checkbox-border"
                controlId="amenities"
              >
                <Form.Label>Amenities*</Form.Label>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`}>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`WiFi`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Scenic Views`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Campfire`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Outdoor Dining`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Parking`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Pet-Friendly`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Room Service`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Garden`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Daily Housekeeping`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Swimming Pool`}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3 checkbox-border"
                controlId="activities"
              >
                <Form.Label>Activities*</Form.Label>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`}>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Hiking Trails`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Guided Tours`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Fishing`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Swimming`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Photography`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Cycling`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Sightseeing`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Cultural Experiences`}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Beach Volleyball`}
                        />
                      </Col>
                      <Col>
                        <Form.Check // prettier-ignore
                          type={type}
                          id={`default-${type}`}
                          label={`Cooking Classes`}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <FloatingLabel
                controlId="contactName"
                label="Contact Name*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Please enter contact name"
                  style={{ textTransform: "capitalize" }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="contactNumber"
                label="Contact Number*"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Please enter contact number"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="price"
                label="Price starts from"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Please enter Price" />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="locationLink"
                label="Google map link"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Please enter Location link "
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="instaLink"
                label="Instagram account link"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Please enter Instagram page link"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="fbLink"
                label="Facebook account link"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Please enter Facebook link"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ display: "flex" }}>
                <FloatingLabel
                  controlId="nearByPlaces"
                  label="Near by Places*"
                  className="mb-3"
                  style={{ marginRight: "1rem" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Please enter Near By Places"
                    style={{ textTransform: "capitalize" }}
                    value={inputData1.nearByPlaces || ""}
                    onChange={data1}
                  />
                </FloatingLabel>
                <Button
                  onClick={addInputData1}
                  style={{ height: "40px" }}
                  className="custom-btn-reverse"
                >
                  Add
                </Button>
              </div>
              <Container style={{ paddingRight: "8rem", marginLeft: "-1rem" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Near by Places</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {array1 &&
                      array1.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td> {item.nearByPlaces} </td>
                            <td>
                              <FontAwesomeIcon
                                icon={faX}
                                onClick={() => deleteData1(i)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Container>
              {/*{array1 &&
                array1.map((item, i) => {
                  return (
                    <div key={i}>
                      <p>
                        {item.nearByPlaces}{" "}
                        <FontAwesomeIcon
                          icon={faX}
                          onClick={() => deleteData1(i)}
                        />
                      </p>
                    </div>
                  );
                })} */}
            </Col>
            <Col>
              <div style={{ display: "flex" }}>
                <FloatingLabel
                  controlId="termsAndCondition"
                  label="Terms & Conditions*"
                  className="mb-3"
                  style={{ marginRight: "1rem" }}
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Please enter T&C"
                    style={{ height: "100px", width: "30rem" }}
                    value={inputData2.termsAndCondition || ""}
                    onChange={data2}
                  />
                </FloatingLabel>
                <Button
                  onClick={addInputData2}
                  style={{ height: "40px" }}
                  className="custom-btn-reverse"
                >
                  Add
                </Button>
              </div>
              <Container style={{ paddingRight: "8rem", marginLeft: "-1rem" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Terms and Conditions</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {array2 &&
                      array2.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item.termsAndCondition} </td>
                            <td>
                              <FontAwesomeIcon
                                icon={faX}
                                onClick={() => deleteData2(i)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="uploadImage"
                label="Upload Image*"
                className="mb-3"
              >
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          {images.map((image, index) => (
            <Image
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Uploaded image ${index}`}
              style={{
                width: "15rem",
                height: "17rem",
                margin: "4px",
              }}
              rounded
            />
          ))}
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
    </div>
  );
}

export default EditStays;
