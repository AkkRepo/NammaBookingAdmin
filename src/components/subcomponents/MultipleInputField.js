import React, { useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";

function MultipleInputField() {
  const [accomodationData, setAccomodationData] = useState([
    { accomodationName: "", noOfPeople: "", noOfBeds: "" },
  ]);
  const accomodationAdd = () => {
    setAccomodationData([
      ...accomodationData,
      { accomodationName: "", noOfPeople: "", noOfBeds: "" },
    ]);
    console.log("added");
  };
  const accomodationHandleChange = (e, index) => {
    const { name, value } = e.target;
    const onChangeVal = [...accomodationData];
    onChangeVal[index][name] = [value];
    setAccomodationData(onChangeVal);
  };
  const deleteAccomodation = (i) => {
    const deleteVal = [...accomodationData];
    deleteVal.splice(i, 1);
    setAccomodationData(deleteVal);

    console.log("deleted");
  };
  return (
    <div>
      <h6>
        Accomodation: <Button onClick={accomodationAdd}>Add</Button>
      </h6>
      {accomodationData.map((val, i) => (
        <Row>
          <Col>
            <FloatingLabel
              controlId="accomodationName"
              label="Accomodation Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Please enter Accomodation"
                //value={val.accomodationName}
                //onChange={(e) => accomodationHandleChange(e, i)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="noOfPeople" label="No of People">
              <Form.Select
                aria-label="No of People"
                //value={val.noOfPeople}
                //onChange={(e) => accomodationHandleChange(e, i)}
              >
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="noOfBeds" label="No of Beds">
              <Form.Select
                aria-label="No of Beds"
                //value={val.noOfBeds}
                //onChange={(e) => accomodationHandleChange(e, i)}
              >
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <Button onClick={() => deleteAccomodation(i)}>Delete</Button>
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default MultipleInputField;
