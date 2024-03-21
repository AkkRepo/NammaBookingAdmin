import React from "react";
import { Link } from "react-router-dom";

//css
import { Table, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScrewdriverWrench,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

//pages
import DeleteStays from "../subcomponents/DeleteStays";
import AppNav from "../header/AppNav";

function Stays() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "6rem" }} />
      <h1 className="brownbear stays-h1 heading-color">Stays</h1>

      <Link to="/AddStays">
        <div className="stays-add-button">
          <Button className="custom-btn">Add Stays</Button>
        </div>
      </Link>

      <Table striped hover>
        <thead>
          <tr>
            <th style={{ color: "#051e3c" }}>Sl no</th>
            <th style={{ color: "#051e3c" }}>Stay Name</th>
            <th style={{ color: "#051e3c" }}>Stay Location</th>
            <th style={{ color: "#051e3c" }}>Accomodation Type</th>
            <th style={{ color: "#051e3c" }}>Category</th>
            <th style={{ color: "#051e3c" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mountain View Retreat</td>
            <td>Mysore</td>
            <td>Entire Place</td>
            <td>Mountain Stay</td>
            <td>
              <Row>
                <Col>
                  <Link to="/EditStays">
                    <FontAwesomeIcon
                      icon={faScrewdriverWrench}
                      size="lg"
                      className="custom-icon"
                    />
                  </Link>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    className="custom-icon"
                    onClick={() => setModalShow(true)}
                  />
                  <DeleteStays
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              </Row>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>River View Retreat</td>
            <td>Sringeri</td>
            <td>Entire Place</td>
            <td>River Stay</td>
            <td>
              <Row>
                <Col>
                  <Link to="/EditStays">
                    <FontAwesomeIcon
                      icon={faScrewdriverWrench}
                      size="lg"
                      className="custom-icon"
                    />
                  </Link>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    className="custom-icon"
                    onClick={() => setModalShow(true)}
                  />
                  <DeleteStays
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              </Row>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Beach View Retreat</td>
            <td>Mangaluru</td>
            <td>Entire Place</td>
            <td>Mangaluru Stay</td>
            <td>
              <Row>
                <Col>
                  <Link to="/EditStays">
                    <FontAwesomeIcon
                      icon={faScrewdriverWrench}
                      size="lg"
                      className="custom-icon"
                    />
                  </Link>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    className="custom-icon"
                    onClick={() => setModalShow(true)}
                  />
                  <DeleteStays
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              </Row>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Stays;
