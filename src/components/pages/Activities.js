import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//css
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

//pages
import AppNav from "../header/AppNav";
import amenitiesData from "./amenitiesData.json";
import AddActivities from "../subcomponents/AddActivities";
import EditActivities from "../subcomponents/EditActivities";
import DeleteActivities from "../subcomponents/DeleteActivities";

function Activities() {
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);

  //const [searchQuery, setSearchQuery] = useState("");
  /*const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };*/

  //fetch
  const [stay, setStay] = useState([]);
  const fetchStay = () => {
    fetch(`http://localhost:8000/data`)
      .then((response) => response.json())
      .then((data) => setStay(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchStay();
  });

  //pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = amenitiesData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(stay.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function prePage() {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage != npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  //pagination end

  //search start
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "6rem" }} />
      <h1 className="brownbear stays-h1 heading-color"> Activities</h1>

      <Row>
        <Col>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              //value={searchQuery}
              //onChange={handleChange}
              style={{ width: "15rem" }}
            >
              <Form.Control
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <div className="stays-add-button">
            <Button
              className="custom-btn"
              onClick={() => setAddModalShow(true)}
            >
              Add Activities
            </Button>
            <AddActivities
              show={addModalShow}
              onHide={() => setAddModalShow(false)}
            />
          </div>
        </Col>
      </Row>

      <Table striped hover>
        <thead>
          <tr>
            <th style={{ color: "#051e3c" }}>Sl no</th>
            <th style={{ color: "#051e3c" }}>Activities</th>
            <th style={{ color: "#051e3c" }}>Edit</th>
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records
              .filter((s) => {
                return search == ""
                  ? s
                  : s.amenities.toLowerCase().includes(search);
              })
              .map(({ i, id, amenities }) => (
                <tr>
                  <td key={i}>{id}</td>
                  <td key={i}>{amenities}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPen}
                      size="lg"
                      className="custom-icon"
                      onClick={() => setEditModalShow(true)}
                    />
                    <EditActivities
                      show={editModalShow}
                      onHide={() => setEditModalShow(false)}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      className="custom-icon"
                      onClick={() => setDeleteModalShow(true)}
                    />
                    <DeleteActivities
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                    />
                  </td>
                </tr>
              ))}
          {/*{records
            .filter((s) => {
              return search == ""
                ? s
                : s.stayName.toLowerCase().includes(search);
            })
            .map((s, i) => (
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
                  <div key={i}>{s.contactName}</div>
                </td>
                <td>
                  <div key={i}>{s.contactNumber}</div>
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
                    onClick={() => setDeleteModalShow(true)}
                  />
                  <DeleteActivities
                    show={deleteModalShow}
                    onHide={() => setDeleteModalShow(false)}
                  />
                </td>
              </tr>
            ))} */}
        </tbody>
      </Table>

      {/* Pagination impementation start */}
      <nav style={{ marginLeft: "65rem" }}>
        <ul className="pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={prePage}
              //style={{ color: "#051e3c" }}
            >
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => changeCPage(n)}
                //style={{ color: "#051e3c" }}
              >
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={nextPage}
              //style={{ color: "#051e3c" }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
      {/* Pagination impementation end */}
    </div>
  );
}

export default Activities;
