import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  FloatingLabel,
  Table,
  Button,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Multiple() {
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
  return (
    <div>
      <Row>
        <Col>
          <FloatingLabel
            controlId="accomodation"
            label="Accomodation"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Accomodation"
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
          <Button onClick={addData}>Add</Button>
        </Col>
      </Row>
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
    </div>
  );
}

export default Multiple;
