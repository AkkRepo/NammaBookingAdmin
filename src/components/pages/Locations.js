import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { AppPagination, Loading } from "./Others/Index";
import LocationDetails from "../subcomponents/LocationDetails";

function Locations() {
  const navigate = useNavigate();
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    cur: 1,
    max: 1,
  });

  const [locations, setLocations] = useState([]);
  const getLocations = async (page = 1) => {
    setLoading(true);
    try {
      const res = await LocationsService.getAllLocations(page);
      if (res.data?.length > 0) {
        setLocations(res.data);
        setPagination({
          cur: res.pagination_data.page,
          max: res.pagination_data.pages,
        });
      } else {
        setLocations([]);
        setPagination({
          cur: 1,
          max: 1,
        });
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const deleteLocations = async (id) => {
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await LocationsService.deleteLocations(id);
        if (res.status === 200) {
          alert(res.message);
          getLocations(pagination.cur);
        } else {
          alert("Error while else");
        }
      }
    } catch (error) {
      alert("Error while catch");
    }
  };

  const navigateToLocation = (id) => {
    navigate("/stays/locationDetails/" + id);
  };
  const changePage = (page) => {
    getLocations(page);
  };
  useEffect(() => {
    getLocations();
  }, []);
  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <header id="header">
        <AppNav />
      </header>

      <h1 className="brownbear stays-h1 heading-color"> Locations</h1>

      <Row>
        {/*<Col>
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
        </Col> */}
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
              onClose={() => getLocations()}
            />
          </div>
        </Col>
      </Row>

      <Table striped hover>
        <thead>
          <tr>
            <th style={{ color: "#051e3c" }}>Sl no</th>
            <th style={{ color: "#051e3c" }}>Locations</th>
            <th style={{ color: "#051e3c" }}>View Details</th>
            {/*
            <th style={{ color: "#051e3c" }}>Edit</th> */}
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            locations.map((i, index) => (
              <tr key={i.id}>
                <td>{index + 1}</td>
                <td>{i.location}</td>
                <td style={{ paddingLeft: "3rem" }}>
                  <LocationDetails
                    location={i}
                    onClick={() => navigateToLocation(i.id)}
                  />
                </td>
                {/*
                <td>
                  <EditLocations location={i} onClose={()=>getLocations()}/>
                </td> */}
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
      {loading && <Loading />}
      <div className="d-flex justify-content-center my-3">
        <AppPagination
          curPage={pagination.cur}
          maxPage={pagination.max}
          changePage={changePage}
        />
      </div>
    </div>
  );
}

export default Locations;
