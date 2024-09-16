import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FloatingLabel,
  Button,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Capitalize } from "../../core/utils";

function Multiple() {
  // Children's Paymentmultiple input start
  const [childrensPaymentArray, setChildrensPaymentArray] = useState([]);
  const [childrensPaymentInputData, setChildrensPaymentInputData] = useState({
    cpLabel: "",
    cpValue: "",
  });

  // Function to handle input change
  const handleInputChange = (e) => {
    setChildrensPaymentInputData({
      ...childrensPaymentInputData,
      [e.target.name]: e.target.value, // dynamically update fields based on input name
    });
  };

  // Function to add input data
  const addChildrensPaymentInputData = () => {
    if (
      childrensPaymentInputData.cpLabel.trim() !== "" &&
      childrensPaymentInputData.cpValue.trim() !== ""
    ) {
      console.log(childrensPaymentArray);
      setChildrensPaymentArray([
        ...childrensPaymentArray,
        childrensPaymentInputData,
      ]);
      setChildrensPaymentInputData({ cpLabel: "", cpValue: "" });
    } else {
      // Notify user that the input fields should not be empty
      alert("Label and Value should not be empty");
    }
  };

  // Function to delete data
  const deleteChildrensPaymentData = (index) => {
    const updatedArray = childrensPaymentArray.filter((item, i) => i !== index);
    setChildrensPaymentArray(updatedArray);
  };
  // Children's Payment multiple input end

  return (
    <Row>
      <h5>Children's Payment</h5>
      <Col>
        <div style={{ display: "flex", marginBottom: "1rem" }}>
          <FloatingLabel
            controlId="cpLabel"
            label="Label*"
            className="mb-3"
            style={{ marginRight: "1rem" }}
          >
            <Form.Control
              type="text"
              placeholder="Please enter Label"
              className="text-capitalize"
              name="cpLabel"
              value={childrensPaymentInputData.cpLabel}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="cpValue"
            label="Value*"
            className="mb-3"
            style={{ marginRight: "1rem" }}
          >
            <Form.Control
              type="text"
              placeholder="Please enter Value"
              className="text-capitalize"
              name="cpValue"
              value={childrensPaymentInputData.cpValue}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <Button
            onClick={addChildrensPaymentInputData}
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
                <th>Sl no.</th>
                <th>Label</th>
                <th>Value</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {childrensPaymentArray.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.cpLabel}</td>
                  <td>{item.cpValue}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faX}
                      onClick={() => deleteChildrensPaymentData(index)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Col>
    </Row>
  );
}

export default Multiple;
