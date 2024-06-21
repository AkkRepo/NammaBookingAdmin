import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Table,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Modal,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import AppNav from "../header/AppNav";
import AddUsers from "../subcomponents/AddUsers";
import DeleteUsers from "../subcomponents/DeleteUsers";
import { UsersService } from "../../services/Users";
import EditUsersCopy from "../subcomponents/EditUsersCopy";

function EditUsersModal({ show, onHide, user }) {
  const [users, setUsers] = useState({
    id: undefined,
    name: "",
    email: "",
    password: "",
    roleId: 1,
  });

  useEffect(() => {
    if (show) {
      setUsers({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        roleId: 1,
      });
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="example-custom-modal-styling-title"
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          View Stay Details
        </Modal.Title>
      </Modal.Header>
      <div>
        <br />
        <Container className="add-stay-group-border">
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
            Stay's Basic Details
          </h4>
          <Row>
            <Col>
              <h6>Stay name: {users.name}</h6>
            </Col>
            <Col>
              <h6>Location:</h6>
            </Col>
            <Col>
              <h6>Rating:</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Categories:</h6>
            </Col>
            <Col style={{ display: "flex" }}>
              <h6>Price Starts from: Price per pertson/room(from api)</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>About Stay:</h6>
            </Col>
          </Row>
        </Container>
        <br />
        <Container className="add-stay-group-border">
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
            Accomodation Details
          </h4>
          <Row>
            <Col>
              <h6>Accomodation Type:</h6>
            </Col>
            <Col>
              <h6>Accomodation</h6>
            </Col>
            <Col>
              <h6>Rooms:</h6>
            </Col>
            <Col>
              <h6>Beds:</h6>
            </Col>
          </Row>
        </Container>
        <br />{" "}
        <Container className="add-stay-group-border">
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
            Accommodation Types
          </h4>
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
              {/*
            {pricingInputArr.map((info, i) => {
              return (
                <tr>
                  <td>{info.roomsName}</td>
                  <td>{info.price}</td>
                  <td>{info.packageIncludes}</td>
                  <td>{info.roomDetails.map((x) => x.noofRooms).join(",")}</td>
                  <td>{info.roomDetails.map((x) => x.roomType).join(",")}</td>

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
             */}
            </tbody>
          </Table>
        </Container>
        <br />
        <Container className="add-stay-group-border">
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>Others</h4>
          <Row>
            <Col>
              <Container style={{ paddingRight: "8rem", marginLeft: "-1rem" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl no</th>
                      <th>Amenities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*
                      {amenitiesArray.map((item, index) => (
                        <tr key={index}>
                          <td>{item.amenities}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteAmenitiesData(index)}
                            />
                          </td>
                        </tr>
                      ))} */}
                  </tbody>
                </Table>
              </Container>
            </Col>
            <Col>
              <Container style={{ paddingRight: "8rem", marginLeft: "-1rem" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl no</th>
                      <th>Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*
                      {activitiesArray.map((item, index) => (
                        <tr key={index}>
                          <td>{item.activities}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteActivitiesData(index)}
                            />
                          </td>
                        </tr>
                      ))} */}
                  </tbody>
                </Table>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container style={{ paddingRight: "8rem", marginLeft: "-1rem" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl no</th>
                      <th>Facilities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*
                      {facilitiesArray.map((item, index) => (
                        <tr key={index}>
                          <td>{item.facilities}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteFacilitiesData(index)}
                            />
                          </td>
                        </tr>
                      ))} */}
                  </tbody>
                </Table>
              </Container>
            </Col>
            <Col>
              <Container style={{ paddingRight: "8rem", marginLeft: "-1rem" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl no</th>
                      <th>Near by Places</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*
                      {nearByPlacesArray.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nearByPlaces}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteNearByPlacesData(index)}
                            />
                          </td>
                        </tr>
                      ))} */}
                  </tbody>
                </Table>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container style={{ paddingRight: "8rem", marginLeft: "-1rem" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl no</th>
                      <th>Terms and Conditions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*{termsAndConditionArray &&
                        termsAndConditionArray.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.termsAndCondition} </td>
                              <td>
                                <FontAwesomeIcon
                                  icon={faX}
                                  onClick={() =>
                                    deleteTermsAndConditionInputData(i)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })} */}
                  </tbody>
                </Table>
              </Container>
            </Col>
          </Row>
        </Container>
        <br />
        <Container className="add-stay-group-border">
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
            Stay Contact Details
          </h4>
          <Row>
            <Col>
              <h6>Contact name:</h6>
            </Col>
            <Col>
              <h6>Contact number:</h6>
            </Col>
            <Col>
              <h6>Address of the stay:</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Google Location Link:</h6>
            </Col>
            <Col>
              <h6>Instagram Link:</h6>
            </Col>
            <Col>
              <h6>Facebook Link:</h6>
            </Col>
          </Row>
        </Container>
        <br />
        <Container className="add-stay-group-border">
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
            Stay Images
          </h4>
        </Container>
        <br />
      </div>

      <Modal.Footer>
        <Button onClick={onHide} className="custom-btn">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Multiple(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        size="lg"
        className="custom-icon"
        onClick={() => setModalShow(true)}
      />
      <EditUsersModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={props.user}
      />
    </>
  );
}

export default Multiple;
