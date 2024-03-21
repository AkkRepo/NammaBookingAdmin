import React from "react";
import { Card, Row, Col } from "react-bootstrap";

//pages
import AppNav from "../header/AppNav";

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
              <Card.Title>Card Title</Card.Title>
              <Card.Text>This is a sample card with hover effect.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="dashboard-custom-card">
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>This is a sample card with hover effect.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="dashboard-custom-card">
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>This is a sample card with hover effect.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
