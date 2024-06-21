import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//css
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

//pages
import AppNav from "../header/AppNav";
import AddUsers from "../subcomponents/AddUsers";
import { Loading, AppPagination } from "./Others/Index";
import DeleteStays from "../subcomponents/DeleteStays";
import { UsersService } from "../../services/Users";

function Stays(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [paginations, setPaginations] = useState({
    cur: 1,
    max: 1,
  });

  const [user, setUser] = useState([]);
  const getUser = async (page = 1) => {
    setLoading(true);
    try {
      const res = await UsersService.getAllUsers(page);
      if (res.data.records?.length > 0) {
        setUser(res.data.records);
        setPaginations({
          cur: res.data.pagination.page,
          max: res.data.pagination.pages,
        });
      } else {
        setUser([]);
        setPaginations({
          cur: 1,
          max: 1,
        });
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
      setPaginations({
        cur: 1,
        max: 1,
      });
    }
  };
  //for future
  {
    /*const deleteUsers = async (id) => {
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await UsersService.deleteUsers(id);
        if (res.status === 200) {
          alert("User delete");
          getUser(paginations.cur);
        } else {
          alert("Error while else");
        }
      }
    } catch (error) {
      alert("Error while catch");
    }
  }; */
  }

  const changePage = (page) => {
    getUser(page);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <header id="header">
        <AppNav />
      </header>
      <div style={{ paddingBottom: "6rem" }} />
      <h1 className="brownbear stays-h1 heading-color"> Stays</h1>

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
            <Link to={"/dashboard/addStays"}>
              <Button className="custom-btn">Add Stay</Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Table striped hover>
        <thead>
          <tr>
            <th style={{ color: "#051e3c" }}>Sl no</th>
            <th style={{ color: "#051e3c" }}>Stay Name</th>
            <th style={{ color: "#051e3c" }}>Contact name</th>
            <th style={{ color: "#051e3c" }}>Contact number</th>
            <th style={{ color: "#051e3c" }}>View Details</th>
            {/* <th style={{ color: "#051e3c" }}>Edit</th>*/}

            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            user.map((i, index) => (
              <tr key={i.id}>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/dashboard/ViewStayDetails">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      size="lg"
                      className="custom-icon"
                      style={{ marginLeft: "2.5rem" }}
                    />
                  </Link>
                </td>
                {/* <td>
                  <Link to="/dashboard/editStays">
                    <FontAwesomeIcon
                      icon={faPen}
                      size="lg"
                      className="custom-icon"
                    />
                  </Link>
                </td>*/}

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
                  <Link to="/dashboard/editStays">
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
      {loading && <Loading />}
      <div className="d-flex justify-content-center my-3">
        <AppPagination
          curPage={paginations.cur}
          maxPage={paginations.max}
          changePage={changePage}
        />
      </div>

      {/* Pagination impementation start 
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
      </nav>*/}
      {/* Pagination impementation end */}
    </div>
  );
}

export default Stays;
