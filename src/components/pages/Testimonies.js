import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//css
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//pages
import AppNav from "../header/AppNav";
import AddLocations from "../subcomponents/AddLocations";
import { TestimoniesServices } from "../../services/Testimonies";
import { AppPagination, Loading } from "./Others/Index";
import LocationDetails from "../subcomponents/LocationDetails";
import TestimoniesDetails from "../subcomponents/TestimoniesDetails";
import AddTestimonies from "../subcomponents/AddTestimonies";
import EditTestimonies from "../subcomponents/EditTestimonies";

function Testimonies() {
  const navigate = useNavigate();
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    cur: 1,
    max: 1,
  });

  const [testimonies, setTestimonies] = useState([]);
  const getTestimonies = async (page = 1) => {
    setLoading(true);
    try {
      const res = await TestimoniesServices.getAllTestimonies(page);
      if (res.data?.length > 0) {
        setTestimonies(res.data);
        setPagination({
          cur: res.pagination_data.page,
          max: res.pagination_data.pages,
        });
      } else {
        setTestimonies([]);
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

  const deleteTestimonies = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await TestimoniesServices.deleteTestimonies(id);
        if (res.status === 200) {
          alert(res.message);
          getTestimonies(pagination.cur);
        } else {
          alert("Error while deleting");
        }
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const navigateToTesimonies = (id) => {
    navigate("/testimoniesDetails" + id);
  };
  const changePage = (page) => {
    getTestimonies(page);
  };
  useEffect(() => {
    getTestimonies();
  }, []);
  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <header id="header">
        <AppNav />
      </header>

      <h1 className="brownbear stays-h1 heading-color">Testimonies</h1>

      <Row>
        <Col>
          <div className="stays-add-button">
            <Button
              className="custom-btn"
              onClick={() => setAddModalShow(true)}
            >
              Add Testimony
            </Button>
            <AddTestimonies
              show={addModalShow}
              onHide={() => setAddModalShow(false)}
              onClose={() => getTestimonies()}
            />
          </div>
        </Col>
      </Row>

      <Table striped hover>
        <thead>
          <tr>
            <th style={{ color: "#051e3c" }}>Sl no</th>
            <th style={{ color: "#051e3c" }}>Name</th>
            <th style={{ color: "#051e3c" }}>View Details</th>
            <th style={{ color: "#051e3c" }}>Edit</th>
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            testimonies.map((i, index) => (
              <tr key={i.id}>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td style={{ paddingLeft: "3rem" }}>
                  <TestimoniesDetails
                    testimony={i}
                    onClick={() => navigateToTesimonies(i.id)}
                  />
                </td>
                <td>
                  <EditTestimonies
                    testimony={i}
                    onClose={() => getTestimonies()}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    className="custom-icon"
                    onClick={(e) => deleteTestimonies(i.id)}
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
      {testimonies.length < 1 && (
        <h3 style={{ color: "#e77225", textAlign: "center" }}>List is empty</h3>
      )}
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

export default Testimonies;
