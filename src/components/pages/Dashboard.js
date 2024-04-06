import React from "react";
import { Card, Row, Col } from "react-bootstrap";

//pages
import AppNav from "../header/AppNav";

//css
import location from "../../img/icon/location.png";
import resort from "../../img/icon/resort.png";

function Dashboard() {
  return (
    <div>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "10rem" }} />
      <Row style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
        <Col>
          <Card className="dashboard-custom-card">
            <Card.Body>
              <Card.Title style={{ display: "flex" }}>
                <h1>53</h1>
                <img
                  src={resort}
                  style={{ width: "5rem", height: "5rem", marginLeft: "25rem" }}
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
                  style={{ width: "5rem", height: "5rem", marginLeft: "25rem" }}
                />
              </Card.Title>
              <Card.Text>Number of locations</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col>
          <Card className="dashboard-custom-card">
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>This is a sample card with hover effect.</Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
}

export default Dashboard;
