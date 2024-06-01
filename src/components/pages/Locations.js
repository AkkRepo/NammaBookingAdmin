import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//css
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

//pages
import AppNav from "../header/AppNav";
import AddLocations from "../subcomponents/AddLocations";
import EditLocations from "../subcomponents/EditLocations";
import DeleteLocations from "../subcomponents/DeleteLocations";
import { LocationsService } from "../../services/Locations";

function Locations() {
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);

  const [locations, setLocations] = useState([]);
  const getLocations = async () => {
    try {
      const res = await LocationsService.getAllLocations();
      if (res.data?.length > 0) {
        setLocations(res.data);
      } else {
        setLocations([]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteLocations = async (id) => {
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await LocationsService.deleteLocations(id);
        if (res.status === 200) {
          alert("Location delete");
        } else {
          alert("Error while else");
        }
      }
    } catch (error) {
      alert("Error while catch");
    }
  };

  useEffect(() => {
    getLocations();
  }, []);
  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "6rem" }} />
      <h1 className="brownbear stays-h1 heading-color"> Locations</h1>

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
                //onChange={(e) => setSearch(e.target.value)}
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
              Add Locations
            </Button>
            <AddLocations
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
            <th style={{ color: "#051e3c" }}>Locations</th>
            <th style={{ color: "#051e3c" }}>Edit</th>
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((i, index) => (
            <tr key={i.id}>
              <td>{index + 1}</td>
              <td>{i.location}</td>
              <td>
                <FontAwesomeIcon
                  icon={faPen}
                  size="lg"
                  className="custom-icon"
                  onClick={() => setEditModalShow(true)}
                />
                <EditLocations
                  show={editModalShow}
                  onHide={() => setEditModalShow(false)}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  className="custom-icon"
                  onClick={(e) => deleteLocations(i.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        {/*
        <tbody>
          {amenities.map((i, index) => (
            <tr key={i.id}>
              <td>{index + 1}</td>
              <td>{i.amenity}</td>{" "}
              <td>
                <FontAwesomeIcon
                  icon={faPen}
                  size="lg"
                  className="custom-icon"
                  onClick={() => setEditModalShow(true)}
                />
                <EditAmenities
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
                <DeleteAmenities
                  show={deleteModalShow}
                  onHide={() => setDeleteModalShow(false)}
                />
              </td>
            </tr>
          ))}
        </tbody> */}
      </Table>
    </div>
  );
}

export default Locations;
