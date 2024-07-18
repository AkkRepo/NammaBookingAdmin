import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AppNav from "../header/AppNav";
import AddCategories from "../subcomponents/AddCategories";
import { CategoriesService } from "../../services/Categories";
import EditCategories from "../subcomponents/EditCategories";
import DeleteCategories from "../subcomponents/DeleteCategories";
import { Loading, AppPagination } from "./Others/Index";
import TestingFile from "../subcomponents/TestingFile";
import ViewCategories from "../subcomponents/CategoriesDetails";

function Categories() {
  const navigate = useNavigate();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    cur: 1,
    max: 1,
  });

  const [categories, setCategories] = useState([]);

  const getCategories = async (page = 1) => {
    setLoading(true);
    try {
      const res = await CategoriesService.getAllCategories(page);
      if (res.data?.length > 0) {
        setCategories(res.data);
        setPagination({
          cur: res.pagination_data.page,
          max: res.pagination_data.pages,
        });
      } else {
        setCategories([]);
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

  const deleteCategory = async (id) => {
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await CategoriesService.deleteCategory(id);
        if (res.status === 200) {
          alert(res.message);
          getCategories(pagination.cur);
        } else {
          alert("Error while else");
        }
      }
    } catch (error) {
      alert("Error while catch");
      console.log(id);
    }
  };
  const navigateToCategory = (id) => {
    navigate("/stays/categoryDetails/" + id);
  };
  const changePage = (page) => {
    getCategories(page);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <header id="header">
        <AppNav />
      </header>

      <h1 className="brownbear stays-h1 heading-color"> Categories</h1>

      <Row>
        {/*
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
        </Col> */}
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
              onClose={() => getCategories()}
            />
          </div>
        </Col>
      </Row>

      <Table striped hover>
        <thead>
          <tr>
            <th style={{ color: "#051e3c" }}>Sl no</th>
            <th style={{ color: "#051e3c" }}>Categories</th>
            <th style={{ color: "#051e3c" }}>View Details</th>
            {/*
            <th style={{ color: "#051e3c" }}>Edit</th> */}
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            categories.map((i, index) => (
              <tr key={i.id}>
                <td>{index + 1}</td>
                <td>{i.category}</td>
                <td style={{ paddingLeft: "3rem" }}>
                  <ViewCategories
                    category={i}
                    onClick={() => navigateToCategory(i.id)}
                  />
                </td>
                {/*<td>
                  <EditCategories category={i} onClose={()=>getCategories()} />
                </td>  */}
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

export default Categories;
