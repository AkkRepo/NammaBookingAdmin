import React from "react";
import { Card, Row, Col } from "react-bootstrap";

//pages
import AppNav from "../header/AppNav";
import Location from "../subcomponents/Location";

//css
import location from "../../img/icon/location.png";
import resort from "../../img/icon/resort.png";
import Multiple from "../subcomponents/Multiple";

function Dashboard() {
  // const markers = [
  // { lat: 12.971599, lng: 77.5946, popupText: "Bengaluru" },
  // { lat: 13.9299, lng: 75.5681, popupText: "Shimoga" },
  // Add more markers as needed
  //];
  return (
    <div>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "7rem" }} />
      <Row style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
        <Col>
          <Card className="dashboard-custom-card">
            <Card.Body>
              <Card.Title style={{ display: "flex" }}>
                <h1>53</h1>
                <img
                  src={resort}
                  style={{ width: "4rem", height: "4rem", marginLeft: "25rem" }}
                />
              </Card.Title>
              <Card.Text>Number of stays registered</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="dashboard-custom-card">
            <Card.Body>
              <Card.Title style={{ display: "flex" }}>
                <h1>25</h1>
                <img
                  src={location}
                  style={{ width: "4rem", height: "4rem", marginLeft: "25rem" }}
                />
              </Card.Title>
              <Card.Text>Number of locations</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Row>
          <Col style={{ marginTop: "1rem" }}>
            <Location />
          </Col>
        </Row>
      </Row>
    </div>
  );
}

export default Dashboard;
