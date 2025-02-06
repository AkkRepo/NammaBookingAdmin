import React, { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";

//pages
import AppNav from "../header/AppNav";
import Location from "../subcomponents/Location";

//css
import category from "../../img/icon/category.png";
import resort from "../../img/icon/resort.png";
import Multiple from "../subcomponents/Multiple";
import { useState } from "react";
import { StaysService } from "../../services/Stays";
import { DashboardService } from "../../services/Dashboard";
import DashboardLocation from "./DashboardLocation";
import Loading from "./Others/Loading";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const getDashboardCount = async () => {
    setLoading(true);
    try {
      const res = await DashboardService.getDashboardCount();
      setDashboardData(res.data);
      // if (res.data) {

      // } else {
      //   setDashboardData([]);
      // }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardCount();
  }, []);
  return (
    <div>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "3rem" }} />
      {!loading && (
        <Row style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
          <Col>
            <Card className="dashboard-custom-card">
              <Card.Body>
                <Card.Title style={{ display: "flex" }}>
                  <h1>{dashboardData.totalStaysCount}</h1>
                  <img
                    src={resort}
                    style={{
                      width: "4rem",
                      height: "4rem",
                      marginLeft: "25rem",
                    }}
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
                  <h1>{dashboardData.totalCategoriesCount}</h1>
                  <img
                    src={category}
                    style={{
                      width: "4rem",
                      height: "4rem",
                      marginLeft: "25rem",
                    }}
                  />
                </Card.Title>
                <Card.Text>Number of Categories</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Row>
            <Col>
              <br />
              <DashboardLocation />
            </Col>
          </Row>
        </Row>
      )}
      {loading && <Loading />}
    </div>
  );
}

export default Dashboard;
