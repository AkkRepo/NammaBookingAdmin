import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//css
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

//pages
import DeleteStays from "../subcomponents/DeleteStays";
import AppNav from "../header/AppNav";

function Stays() {
  const [modalShow, setModalShow] = React.useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //fetch
  const [stay, setStay] = useState([]);
  const fetchStay = () => {
    fetch(`http://localhost:8000/data?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setStay(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchStay();
  }, [searchQuery]);
  return (
    <div>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "6rem" }} />
      <h1 className="brownbear stays-h1 heading-color"> Namma Stays</h1>

      <Row>
        <Col>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              value={searchQuery}
              onChange={handleChange}
            >
              <Form.Control type="text" placeholder={searchQuery} />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Link to="/AddStays">
            <div className="stays-add-button">
              <Button className="custom-btn">Add Stays</Button>
            </div>
          </Link>
        </Col>
      </Row>

      <Table striped hover>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            value={searchQuery}
            onChange={handleChange}
          >
            <Form.Control type="text" placeholder={searchQuery} />
          </Form.Group>
          <Button>Search</Button>
        </Form>
        <thead>
          <tr>
            <th style={{ color: "#051e3c" }}>Sl no</th>
            <th style={{ color: "#051e3c" }}>Stay Name</th>
            <th style={{ color: "#051e3c" }}>Stay Location</th>
            <th style={{ color: "#051e3c" }}>Accomodation Type</th>
            <th style={{ color: "#051e3c" }}>Category</th>
            <th style={{ color: "#051e3c" }}>Edit</th>
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {stay.map((s, i) => (
            <tr>
              <td>
                <div key={i}>{s.id}</div>
              </td>
              <td>
                <div key={i}>{s.stayName}</div>
              </td>
              <td>
                <div key={i}>{s.stayLocation}</div>
              </td>
              <td>
                <div key={i}>{s.accomodation}</div>
              </td>
              <td>
                <div key={i}>{s.category}</div>
              </td>
              <td>
                <Link to="/EditStays">
                  <FontAwesomeIcon
                    icon={faPen}
                    size="lg"
                    className="custom-icon"
                  />
                </Link>
              </td>
              <td>
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
              </td>
            </tr>
          ))}
          {/*<tr>
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
                      icon={faPen}
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
                      icon={faPen}
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
                      icon={faPen}
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
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
}

export default Stays;
