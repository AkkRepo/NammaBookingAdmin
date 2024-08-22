import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import image from "../../img/login/login.jpeg";
import { DashboardService } from "../../services/Dashboard";
import Stays from "./Stays";
import Loading from "./Others/Loading";

function DashboardLocation() {
  const [loading, setLoading] = useState(false);
  const [dashboardLocation, setDashboardLocation] = useState([]);
  const getDashboardLocation = async () => {
    setLoading(true);
    try {
      const res = await DashboardService.getDashboardLocation();
      console.log(res);
      if (res.data?.length > 0) {
        setDashboardLocation(res.data);
      } else {
        setDashboardLocation([]);
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardLocation();
  }, []);
  return (
    <Container>
      <Row>
        <div style={{ display: "contents" }}>
          {dashboardLocation.map((i, index) => (
            <Card
              key={i.id}
              className="dashboard-location-card dashboard-location"
            >
              <Card.Img
                src={i.imageUrl}
                alt="Location"
                className="dashboard-location-image"
              />
              <Card.ImgOverlay>
                <Card.Title className="dashboard-location-name">
                  {i.location}
                </Card.Title>
              </Card.ImgOverlay>
              <p className="dashboard-location-stays">{i.count} Stays</p>
            </Card>
          ))}
        </div>
      </Row>

      {loading && <Loading />}
    </Container>
  );
}

export default DashboardLocation;
