import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// UI
import { Table, Row, Col, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// App
import AppNav from "../header/AppNav";
import { TestimoniesServices } from "../../services/Testimonies";
import { AppPagination, Loading } from "./Others/Index";
import TestimoniesDetails from "../subcomponents/TestimoniesDetails";
import AddTestimonies from "../subcomponents/AddTestimonies";
import EditTestimonies from "../subcomponents/EditTestimonies";

// New common modals
import ConfirmModal from "../common/ConfirmModal.js";
import SuccessModal from "../common/SuccessModal.js";

function Testimonies() {
  const navigate = useNavigate();

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ cur: 1, max: 1 });
  const [testimonies, setTestimonies] = useState([]);

  // confirm/success modal states
  const [confirmState, setConfirmState] = useState({
    show: false,
    action: null, // "approve" | "reject"
    id: null,
    message: "",
  });
  const [successState, setSuccessState] = useState({
    show: false,
    message: "",
  });

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
        setPagination({ cur: 1, max: 1 });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonies = async (id) => {
    const val = window.confirm("Do you want to delete?");
    if (!val) return;
    setLoading(true);
    try {
      const res = await TestimoniesServices.deleteTestimonies(id);
      if (res.status === 200) {
        alert(res.message || "Deleted");
        getTestimonies(pagination.cur);
      } else {
        alert(res?.data?.message || "Error while deleting");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ----- Approve / Reject flow (with confirm + success modals) -----
  const openApproveConfirm = (id) => {
    setConfirmState({
      show: true,
      id,
      action: "approve",
      message: "Are you sure you want to approve this testimonial?",
    });
  };

  const openRejectConfirm = (id) => {
    setConfirmState({
      show: true,
      id,
      action: "reject",
      message: "Are you sure you want to reject this testimonial?",
    });
  };

  const handleConfirmAction = async () => {
    const { id, action } = confirmState;
    setConfirmState((s) => ({ ...s, show: false }));
    setLoading(true);
    try {
      let res;
      if (action === "approve") {
        res = await TestimoniesServices.approveTestimony(id);
      } else {
        res = await TestimoniesServices.rejectTestimony(id);
      }

      if (res.status === 200) {
        setSuccessState({
          show: true,
          message:
            action === "approve"
              ? "✅ Testimonial approved. It will now be visible to public users."
              : "❌ Testimonial rejected.",
        });
        getTestimonies(pagination.cur);
      } else {
        setSuccessState({
          show: true,
          message: res?.data?.message || "Something went wrong.",
        });
      }
    } catch (e) {
      setSuccessState({ show: true, message: e.message });
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    const s = (status || "").toUpperCase();
    let variant = "secondary";
    if (s === "APPROVED") variant = "success";
    else if (s === "PENDING") variant = "warning";
    else if (s === "REJECTED") variant = "danger";
    return <Badge bg={variant}>{s || "—"}</Badge>;
  };

  const changePage = (page) => getTestimonies(page);

  useEffect(() => {
    getTestimonies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Button className="custom-btn" onClick={() => setAddModalShow(true)}>
              Add Testimony
            </Button>
            <AddTestimonies
              show={addModalShow}
              onHide={() => setAddModalShow(false)}
              onClose={() => getTestimonies(pagination.cur)}
            />
          </div>
        </Col>
      </Row>

      <Table striped hover>
        <thead>
          <tr>
            <th style={{ color: "#051e3c" }}>Sl no</th>
            <th style={{ color: "#051e3c" }}>Name</th>
            <th style={{ color: "#051e3c" }}>Status</th>
            <th style={{ color: "#051e3c" }}>View Details</th>
            <th style={{ color: "#051e3c" }}>Edit</th>
            <th style={{ color: "#051e3c" }}>Approve / Reject</th>
            <th style={{ color: "#051e3c" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            testimonies.map((i, index) => {
              const isPending = (i.status || "").toUpperCase() === "PENDING";
              return (
                <tr key={i.id}>
                  <td>{(pagination.cur - 1) * 10 + (index + 1)}</td>
                  <td>{i.name}</td>
                  <td>{statusBadge(i.status)}</td>
                  <td style={{ paddingLeft: "3rem" }}>
                    <TestimoniesDetails testimony={i} />
                  </td>
                  <td>
                    <EditTestimonies
                      testimony={i}
                      onClose={() => getTestimonies(pagination.cur)}
                    />
                  </td>
                  <td>
                    {isPending ? (
                      <>
                        <Button
                          size="sm"
                          className="me-2"
                          variant="success"
                          onClick={() => openApproveConfirm(i.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => openRejectConfirm(i.id)}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span style={{ color: "#777" }}>—</span>
                    )}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      className="custom-icon"
                      onClick={() => deleteTestimonies(i.id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
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

      {/* Confirm action modal */}
      <ConfirmModal
        show={confirmState.show}
        title="Please Confirm"
        message={confirmState.message}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmState({ show: false, action: null, id: null, message: "" })}
        confirmLabel={confirmState.action === "reject" ? "Reject" : "Approve"}
        cancelLabel="Cancel"
      />

      {/* Success modal */}
      <SuccessModal
        show={successState.show}
        title="Action Completed"
        message={successState.message}
        onClose={() => setSuccessState({ show: false, message: "" })}
      />
    </div>
  );
}

export default Testimonies;
