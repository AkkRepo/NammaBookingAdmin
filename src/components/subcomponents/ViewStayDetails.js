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
//page
import AppNav from "../header/AppNav";

function ViewStayDetails() {
  return (
    <div>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "6rem" }} />
      <h1 className="brownbear stays-h1 heading-color">View Stay Details</h1>
      <Container className="add-stay-group-border">
        <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
          Stay's Basic Details
        </h4>
        <Row>
          <Col>
            <h6>Stay name:</h6>
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
        <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>Stay Images</h4>
      </Container>
      <br />
    </div>
  );
}

export default ViewStayDetails;
