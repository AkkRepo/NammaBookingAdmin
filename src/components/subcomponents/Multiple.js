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

function Multiple() {
  //near by places myltiple input start
  let [array1, setArray1] = useState([]);
  let [inputData1, setInputData1] = useState({
    accomodationName: "",
    noOfPeople: "",
    noOfBeds: "",
  });
  function data1(e) {
    setInputData1({ ...array1, nearByPlaces: e.target.value });
  }
  let { accomodationName, noOfPeople, noOfBeds } = inputData1;
  function addInputData1() {
    setArray1([...array1, accomodationName, noOfPeople, noOfBeds]);
    console.log(inputData1);
    setInputData1({ accomodationName: "", noOfPeople: "", noOfBeds: "" });
  }

  console.log("total array: ", array1);

  function deleteData1(i) {
    console.log(i, "this index row wants to be deleted");
    let total1 = [...array1];
    total1.splice(i, 1);
    setArray1(total1);
  }
  //near by places myltiple input end
  return (
    <div>
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
            value={inputData1.accomodationName || ""}
            onChange={data1}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="nearByPlaces"
          label="Near by Places*"
          className="mb-3"
          style={{ marginRight: "1rem" }}
        >
          <Form.Control
            type="text"
            placeholder="Please enter Near By Places"
            value={inputData1.noOfPeople || ""}
            onChange={data1}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="nearByPlaces"
          label="Near by Places*"
          className="mb-3"
          style={{ marginRight: "1rem" }}
        >
          <Form.Control
            type="text"
            placeholder="Please enter Near By Places"
            value={inputData1.noOfBeds || ""}
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
                    <td> {item.noOfBeds} </td>
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
    </div>
  );
}

export default Multiple;
