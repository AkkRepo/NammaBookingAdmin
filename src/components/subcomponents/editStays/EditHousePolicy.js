import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
import { faX, faPen } from "@fortawesome/free-solid-svg-icons";
import { StaysService } from "../../../services/Stays";
import { LoadingModal } from "../../pages/Others/Index";

function EditHousePolicy(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stays, setStays] = useState({
    id: undefined,
    checkInTime: "",
    checkOutTime: "",
    smoking: "",
    pets: "",
    coupleFriendly: "",
    // childrenBelow5: "",
    // children5To10: "",
    // childrenAbove10: "",
    includedMeals: "",
    extraStarters: "",
  });
  const [error, setError] = useState({
    checkInTime: "",
    checkOutTime: "",
    smoking: "",
    pets: "",
    coupleFriendly: "",
    // childrenBelow5: "",
    // children5To10: "",
    // childrenAbove10: "",
    includedMeals: "",
    extraStarters: "",
  });
  const validation = () => {
    let tempError = {
      checkInTime: "",
      checkOutTime: "",
      smoking: "",
      pets: "",
      coupleFriendly: "",
      // childrenBelow5: "",
      // children5To10: "",
      // childrenAbove10: "",
      includedMeals: "",
      extraStarters: "",
    };
    let valid = true;
    if (!stays.checkInTime) {
      tempError.checkInTime = "Required Field";
      valid = false;
    }
    if (!stays.checkOutTime) {
      tempError.checkOutTime = "Required Field";
      valid = false;
    }
    if (!stays.smoking) {
      tempError.smoking = "Required Field";
      valid = false;
    }
    if (!stays.pets) {
      tempError.pets = "Required Field";
      valid = false;
    }
    if (!stays.coupleFriendly) {
      tempError.coupleFriendly = "Required Field";
      valid = false;
    }
    // if (!stays.childrenBelow5) {
    //   tempError.childrenBelow5 = "Required Field";
    //   valid = false;
    // }
    // if (!stays.children5To10) {
    //   tempError.children5To10 = "Required Field";
    //   valid = false;
    // }
    // if (!stays.childrenAbove10) {
    //   tempError.childrenAbove10 = "Required Field";
    //   valid = false;
    // }
    if (!stays.includedMeals) {
      tempError.includedMeals = "Required Field";
      valid = false;
    }
    if (!stays.extraStarters) {
      tempError.extraStarters = "Required Field";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const update = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await StaysService.updateHousePolicy({
          id: stays.id,
          checkInTime: stays.checkInTime,
          checkOutTime: stays.checkOutTime,
          smoking: stays.smoking,
          pets: stays.pets,
          coupleFriendly: stays.coupleFriendly,
          // childrenBelow5: stays.childrenBelow5,
          // children5To10: stays.children5To10,
          // childrenAbove10: stays.childrenAbove10,
          includedMeals: stays.includedMeals,
          extraStarters: stays.extraStarters,
        });
        if (res.status === 200) {
          alert(res.message);
          props.onUpdateStay();
        } else {
          alert("Error while updating");
        }
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    setStays({ ...props.stays.stayHousePolicyDetails });
  }, [props.stays]);
  return (
    <div>
      <Row>
        <Col>
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
            House Policy
          </h4>
        </Col>
      </Row>
      <Row>
        <h5>Check In/Out Time</h5>
        <Col>
          <FloatingLabel
            controlId="checkInTime"
            label="Check-In Time*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.checkInTime}
              onChange={(e) =>
                setStays({ ...stays, checkInTime: e.target.value })
              }
              isInvalid={!!error.checkInTime}
            />
            <p className="required-field-meassage">{error.checkInTime}</p>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="checkOutTime"
            label="Check-Out Time*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.checkOutTime}
              onChange={(e) =>
                setStays({ ...stays, checkOutTime: e.target.value })
              }
              isInvalid={!!error.checkOutTime}
            />
            <p className="required-field-meassage">{error.checkOutTime}</p>
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId="smoking" label="Smoking*" className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.smoking}
              onChange={(e) => setStays({ ...stays, smoking: e.target.value })}
              isInvalid={!!error.smoking}
            />
            <p className="required-field-meassage">{error.smoking}</p>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="pets" label="Pets*" className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.pets}
              onChange={(e) => setStays({ ...stays, pets: e.target.value })}
              isInvalid={!!error.pets}
            />
            <p className="required-field-meassage">{error.pets}</p>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="coupleFriendly"
            label="Couple Friendly*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.coupleFriendly}
              onChange={(e) =>
                setStays({
                  ...stays,
                  coupleFriendly: e.target.value,
                })
              }
              isInvalid={!!error.coupleFriendly}
            />
            <p className="required-field-meassage">{error.coupleFriendly}</p>
          </FloatingLabel>
        </Col>
      </Row>
      {/* <Row>
        <h5>Children's Payment</h5>
        <Col>
          <FloatingLabel
            controlId="childrenBelow5"
            label="Children below 5 year*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.childrenBelow5}
              onChange={(e) =>
                setStays({
                  ...stays,
                  childrenBelow5: e.target.value,
                })
              }
              isInvalid={!!error.childrenBelow5}
            />
            <p className="required-field-meassage">{error.childrenBelow5}</p>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="children5To10"
            label="Children aged 5-10 years*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.children5To10}
              onChange={(e) =>
                setStays({
                  ...stays,
                  children5To10: e.target.value,
                })
              }
              isInvalid={!!error.children5To10}
            />
            <p className="required-field-meassage">{error.children5To10}</p>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="childrenAbove10"
            label="Children above 10 year*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.childrenAbove10}
              onChange={(e) =>
                setStays({
                  ...stays,
                  childrenAbove10: e.target.value,
                })
              }
              isInvalid={!!error.childrenAbove10}
            />
            <p className="required-field-meassage">{error.childrenAbove10}</p>
          </FloatingLabel>
        </Col>
      </Row> */}
      <Row>
        <h5>Food Policy</h5>
        <Col>
          <FloatingLabel
            controlId="includedMeals"
            label="Included meals*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.includedMeals}
              onChange={(e) =>
                setStays({
                  ...stays,
                  includedMeals: e.target.value,
                })
              }
              isInvalid={!!error.includedMeals}
            />
            <p className="required-field-meassage">{error.includedMeals}</p>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="extraStarters"
            label="Extra Starters*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter data"
              value={stays.extraStarters}
              onChange={(e) =>
                setStays({
                  ...stays,
                  extraStarters: e.target.value,
                })
              }
              isInvalid={!!error.extraStarters}
            />
            <p className="required-field-meassage">{error.extraStarters}</p>
          </FloatingLabel>
        </Col>
      </Row>
      <br />
      <div>
        <Button className="custom-btn" onClick={update}>
          Update
        </Button>
      </div>
      <LoadingModal show={loading} />
    </div>
  );
}

export default EditHousePolicy;
