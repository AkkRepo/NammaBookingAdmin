import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AppNav from "../header/AppNav";
import AddBedType from "../subcomponents/AddBedType";
import { BedTypeServices } from "../../services/BedType";
import { Loading, AppPagination } from "./Others/Index";
import EditBedType from "../subcomponents/EditBedType";

function BedType() {
  const navigate = useNavigate();
  const [addModalShow, setAddModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    cur: 1,
    max: 1,
  });

  const [bedType, setBedType] = useState([]);

  const getBedType = async (page = 1) => {
    setLoading(true);
    try {
      const res = await BedTypeServices.getAllBedTypes(page);
      if (res.data?.length > 0) {
        setBedType(res.data);
        setPagination({
          cur: res.pagination_data.page,
          max: res.pagination_data.pages,
        });
      } else {
        setBedType([]);
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

  const deleteBedType = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await BedTypeServices.deleteBedType(id);
        if (res.status === 200) {
          alert(res.message);
          getBedType(pagination.cur);
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      console.log(id);
      setLoading(false);
    }
  };
  const changePage = (page) => {
    getBedType(page);
  };

  useEffect(() => {
    getBedType();
  }, []);

  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <header id="header">
        <AppNav />
      </header>

      <h1 className="brownbear stays-h1 heading-color">Bed Types</h1>

      <Row>
        <Col>
          <div className="stays-add-button">
            <Button
              className="custom-btn"
              onClick={() => setAddModalShow(true)}
            >
              Add BedType
            </Button>
            <AddBedType
              show={addModalShow}
              onHide={() => setAddModalShow(false)}
              onClose={() => getBedType()}
            />
          </div>
        </Col>
      </Row>

      <Table striped hover>
        <thead>
          <tr>
            <th style={{ color: "#051e3c" }}>Sl no</th>
            <th style={{ color: "#051e3c" }}>Bed Type</th>
            <th style={{ color: "#051e3c" }}>Edit</th>
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            bedType.map((i, index) => (
              <tr key={i.id}>
                <td>{index + 1}</td>
                <td>{i.bedType}</td>
                <td>
                  <EditBedType bedType={i} onClose={() => getBedType()} />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    className="custom-icon"
                    onClick={(e) => deleteBedType(i.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {bedType.length < 1 && (
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

export default BedType;
