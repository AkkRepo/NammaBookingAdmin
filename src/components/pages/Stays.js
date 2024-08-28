import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//css
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

//pages
import AppNav from "../header/AppNav";
import { Loading, AppPagination } from "./Others/Index";
import { StaysService } from "../../services/Stays";

function Stays(props) {
  const navigate = useNavigate();
  //const [modalShow, setModalShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [paginations, setPaginations] = useState({
    cur: 1,
    max: 1,
  });

  const [stay, setStay] = useState([]);
  const getStay = async (page = 1) => {
    setLoading(true);
    try {
      const res = await StaysService.getAllStays(page);
      console.log(res);
      if (res.data?.length > 0) {
        setStay(res.data);
        setPaginations({
          cur: res.pagination_data.page,
          max: res.pagination_data.pages,
        });
      } else {
        setStay([]);
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
  const deleteStays = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deleteStays(id);
        if (res.status === 200) {
          alert(res.message);
          getStay(paginations.cur);
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
  const navigateToStay = (id) => {
    navigate("/stays/stayDetails/" + id);
  };
  const navigateToEditStay = (id) => {
    navigate("/stays/editStays/" + id);
  };
  const changePage = (page) => {
    getStay(page);
  };
  useEffect(() => {
    getStay();
  }, []);
  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <header id="header">
        <AppNav />
      </header>

      <h1 className="brownbear stays-h1 heading-color"> Stays</h1>

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
            <Link to={"/stays/addStays"}>
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
            {/* <th style={{ color: "#051e3c" }}>View Details</th> */}
            <th style={{ color: "#051e3c" }}>View Details</th>
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            stay.map((i, index) => (
              <tr key={i.id}>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td>{i.contactPersonName}</td>
                <td>{i.contactPersonNumber}</td>
                {/* <td>
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    size="lg"
                    className="custom-icon"
                    style={{ marginLeft: "2.5rem" }}
                    onClick={() => navigateToStay(i.id)}
                  />
                </td> */}
                <td>
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    size="lg"
                    className="custom-icon"
                    style={{ marginLeft: "2.5rem" }}
                    onClick={() => navigateToEditStay(i.id)}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    className="custom-icon"
                    onClick={(e) => {
                      deleteStays(i.id);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {stay.length < 1 && (
        <h3 style={{ color: "#e77225", textAlign: "center" }}>List is empty</h3>
      )}
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
