import React, { useState } from "react";
import { Button, Form, FloatingLabel, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Multiple() {
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

  return (
    <div>
      <Row>
        <Col>
          <FloatingLabel
            controlId="termsAndCondition"
            label="termsAndCondition"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Please enter T&C"
              style={{ height: "100px", width: "30rem" }}
              value={inputData2.termsAndCondition || ""}
              onChange={data2}
            />
          </FloatingLabel>
          <Button onClick={addInputData2}>Add</Button>
          {array2 &&
            array2.map((item, i) => {
              return (
                <div key={i} style={{ display: "flex" }}>
                  <p>{item.termsAndCondition}</p>
                  <FontAwesomeIcon icon={faX} onClick={() => deleteData2(i)} />
                </div>
              );
            })}
        </Col>
      </Row>
    </div>
  );
}

export default Multiple;
