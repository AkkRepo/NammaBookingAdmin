import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//css
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

//pages
import AppNav from "../header/AppNav";
import amenitiesData from "./amenitiesData.json";
import AddCategories from "../subcomponents/AddCategories";
import { AmenitiesService } from "../../services/Amenities";
import EditCategories from "../subcomponents/EditCategories";
import DeleteCategories from "../subcomponents/DeleteCategories";
import { CategoriesService } from "../../services/Categories";

function Categories() {
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const res = await CategoriesService.getAllCategories();
      if (res.data?.length > 0) {
        setCategories(res.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await CategoriesService.deleteCategory(id);
        if (res.status === 200) {
          alert("Category deleted");
          getCategories();
        } else {
          alert("Error while else");
        }
      }
    } catch (error) {
      alert("Error while catch");
      console.log(id);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "6rem" }} />
      <h1 className="brownbear stays-h1 heading-color"> Categories</h1>

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
              Add Categories
            </Button>
            <AddCategories
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
            <th style={{ color: "#051e3c" }}>Categories</th>
            <th style={{ color: "#051e3c" }}>Edit</th>
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((i, index) => (
            <tr key={i.id}>
              <td>{index + 1}</td>
              <td>{i.category}</td>
              <td>
                <FontAwesomeIcon
                  icon={faPen}
                  size="lg"
                  className="custom-icon"
                  onClick={() => setEditModalShow(true)}
                />
                <EditCategories
                  show={editModalShow}
                  onHide={() => setEditModalShow(false)}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  className="custom-icon"
                  onClick={(e) => deleteCategory(i.id)}
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

export default Categories;
