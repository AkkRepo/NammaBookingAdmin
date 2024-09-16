import React, { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//css
import {
  Row,
  Col,
  Container,
  Form,
  FloatingLabel,
  Button,
  Table,
  Image,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faTrash,
  faPen,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
//page
import AppNav from "../../header/AppNav";
import { Capitalize } from "../../../core/utils";
import { useNavigate } from "react-router-dom";
import { StaysService } from "../../../services/Stays";
import { LoadingModal } from "../../pages/Others/Index";
import EditBasicDetails from "./EditBasicDetails";
import EditHousePolicy from "./EditHousePolicy";
import AddAccomodationTypes from "./AddAccomodationTypes";
import EditAccomodationTypes from "./EditAccomodationTypes";
import AddAmenities from "./AddAmenities";
import EditAmenities from "./EditAmenities";
import AddActivities from "./AddActivities";
import EditActivities from "./EditActivities";
import AddFacilities from "./AddFacilities";
import EditFacilities from "./EditFacilities";
import AddNearByPlaces from "./AddNearByPlaces";
import EditNearByePlaces from "./EditNearByPlaces";
import AddImage from "./AddImage";
import AddPricing from "./AddPricing";
import EditBedDetails from "./EditBedDetails";
import EditPricing from "./EditPricing";
import AddChildrensPayment from "./AddChildrensPayment";
import EditChildrensPayment from "./EditChildrensPayment";
import AddBedDetails from "./AddBedDetails";

function EditStays() {
  //View BedDtails

  const [showM, set_Show_M] = useState(false);
  const [modalData, setModalData] = useState();
  const modalShow = () => {
    set_Show_M(true);
  };
  const closeModal = () => {
    setModalData();
    set_Show_M(false);
  };
  const openModalHandle = (bedDetails) => {
    setModalData(bedDetails);
    //console.log(modalData);
    modalShow();
  };

  //View stay details start TEMP
  const { id } = useParams();
  // const [stays, setStay] = useState();
  const [loading, setLoading] = useState(false);
  const [openImage, setImage] = useState("");
  const getStay = async () => {
    setLoading(true);
    try {
      const res = await StaysService.getStaysById(id);
      if (res.status === 200) {
        //console.log(res.data);
        setStays(res.data);
        if (res.data?.images?.length > 0) {
          setImage(res.data.images[0].imageUrl);
        }
      } else {
        alert(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStay();
  }, []);

  //View stay details end TEMP

  const [stays, setStays] = useState({
    name: "",
    locationId: undefined,
    rating: undefined,
    priceStartsFrom: "",
    about: "",
    accommodationType: "",
    accommodation: "",
    noOfRooms: "",
    noOfBeds: "",
    contactPersonName: "",
    contactPersonNumber: "",
    googleMapLink: "",
    instagramLink: "",
    facebookLink: "",
    address: "",
    stayCategoriesDetails: [],
    accommodationTypesDetails: [
      {
        id: undefined,
      },
    ],
    stayPricingDetails: [],
    stayAmenitiesDetails: [
      {
        amenity: "",
      },
    ],
    childrenPaymentsDetails: [],
    stayActivitiesDetails: [],
    otherFacilityDetails: [],
    nearByPlacesDetails: [],
    stayHousePolicyDetails: {
      checkInTime: "",
      checkOutTime: "",
      smoking: "",
      pets: "",
      coupleFriendly: "",
      // childrenBelow5: "",
      // children5To10: "",
      // childrenAbove10: "",
      includedMeals: "",
      extraStarters: "",
    },
    images: [""],
  });

  //delete amenity
  const deleteAmenity = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deleteAmenity(id);
        if (res.status === 200) {
          alert(res.message);
          getStay();
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  //delete Activity
  const deleteActivity = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deleteActivity(id);
        if (res.status === 200) {
          alert(res.message);
          getStay();
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  //delete Facility
  const deleteFacility = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deleteFacility(id);
        if (res.status === 200) {
          alert(res.message);
          getStay();
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  //delete Near By Places
  const deleteNearByPlaces = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deleteNearByPlaces(id);
        if (res.status === 200) {
          alert(res.message);
          getStay();
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  //delete Accomodation Types
  const deleteAccomodationTypes = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deleteAccomodationTypes(id);
        if (res.status === 200) {
          alert(res.message);
          getStay();
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  //delete Pricing
  const deletePricing = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deletePricingDetails(id);
        if (res.status === 200) {
          alert(res.message);
          getStay();
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  //delete Pricing
  const deleteChildrensPayment = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deleteChildrensPayment(id);
        if (res.status === 200) {
          alert(res.message);
          getStay();
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  //delete Image
  const deleteImage = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deleteImage(id);
        if (res.status === 200) {
          alert(res.message);
          getStay();
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  //delete BedDetails
  const deleteBedDetails = async (id) => {
    setLoading(true);
    try {
      const val = window.confirm("Do you want to delete?");
      if (val) {
        const res = await StaysService.deleteBedDetails(id);
        if (res.status === 200) {
          alert(res.message);
          getStay();
        } else {
          alert("Error while deleting");
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const setDefaultImage = async (image) => {
    setLoading(true);
    try {
      const res = await StaysService.setDefaultImage(id, image);
      if (res.status === 200) {
        alert(res.message);
        getStay();
      } else {
        alert("Error while setting default image");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalData) {
      setModalData(
        stays.accommodationTypesDetails.find((x) => x.id === modalData.id)
      );
    }
  }, [stays]);
  return (
    <div>
      <header id="header">
        <AppNav />
      </header>

      <h1 className="brownbear stays-h1 heading-color">Edit Stay</h1>

      <Form>
        <p
          style={{
            fontSize: "13px",
            //fontWeight: "bold",
            //textAlign: "right",
            //marginLeft: "-6rem",
            paddingLeft: "63rem",
          }}
        >
          (*) marked fields are compulsory
        </p>
        <Container>
          <Container className="add-stay-group-border">
            <EditBasicDetails stays={stays} onUpdateStay={() => getStay()} />
          </Container>
          <br />

          <Container className="add-stay-group-border">
            <EditHousePolicy stays={stays} onUpdateStay={() => getStay()} />
            <br />
            <Row>
              <Col>
                <div style={{ display: "flex" }}>
                  <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
                    Children's Payment
                  </h4>
                  <div style={{ marginTop: "-2px", paddingLeft: "17px" }}>
                    <AddChildrensPayment
                      id={stays.id}
                      onUpdate={() => getStay()}
                    />
                  </div>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Label</th>
                        <th>Details</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stays.childrenPaymentsDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.label}</td>
                          <td>{item.details}</td>
                          <td>
                            <EditChildrensPayment
                              childrensPayment={item}
                              onUpdateStay={() => getStay()}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="stay-trash-button"
                              onClick={(e) => {
                                deleteChildrensPayment(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row>
          </Container>
          <br />
          <Container className="add-stay-group-border">
            <Row>
              <Col style={{ display: "flex" }}>
                <h4 className="edit-stays-accomodation-type">
                  Accomodation Types:
                </h4>
                <AddAccomodationTypes id={stays.id} onUpdate={getStay} />
              </Col>
              {/* <div className="d-flex align-items-center justify-content-between">
                <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
                  Accomodation Types:
                </h4>
                <AddAccomodationTypes />
              </div> */}

              <Container
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "1rem",
                }}
              >
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl no</th>
                      <th>Room Name</th>
                      <th>Room Type</th>
                      <th>No. of Rooms</th>
                      <th>No. Of Guests</th>
                      <th>Bed Details</th>
                      <th>Edit</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stays.accommodationTypesDetails.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.roomName}</td>
                          <td>{item.roomType}</td>
                          <td>{item.noOfRooms}</td>
                          <td>{item.noOfGuests}</td>

                          <td>
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              size="lg"
                              className="custom-icon"
                              onClick={() => openModalHandle(item)}
                              style={{ paddingLeft: "4rem" }}
                            />
                          </td>
                          {/* <td>
                            {item.bedDetails.map((x) => x.noOfBeds).join(",")}
                          </td>
                          <td>
                            {item.bedDetails
                              .map((x) => x.bedTypeDetails.bedType)
                              .join(",")}
                          </td> */}
                          <td>
                            <EditAccomodationTypes
                              accomodation={item}
                              onUpdateStay={() => getStay()}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="stay-trash-button"
                              onClick={(e) => {
                                deleteAccomodationTypes(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
            </Row>
          </Container>
          <br />
          <Modal show={showM} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Bed Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <AddBedDetails id={modalData?.id} onUpdate={() => getStay()} />
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl no.</th>
                      <th>No of Beds</th>
                      <th>Bed Type</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {modalData?.bedDetails?.map((item, index) => {
                    return (
                      <tbody>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td style={{ paddingLeft: "2rem" }}>
                            {item.noOfBeds}
                          </td>
                          <td>{item.bedTypeDetails.bedType}</td>
                          <td>
                            <EditBedDetails
                              bedDetails={item}
                              onUpdateStay={() => getStay()}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="stay-trash-button"
                              onClick={(e) => {
                                deleteBedDetails(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </div>
            </Modal.Body>
          </Modal>

          <Container className="add-stay-group-border">
            <Row>
              <Col style={{ display: "flex" }}>
                <h4 className="edit-stays-accomodation-type">Pricing:</h4>
                <AddPricing id={stays.id} onUpdate={getStay} />
              </Col>
              <Container
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "1rem",
                }}
              >
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl no</th>
                      <th>Package Name</th>
                      <th>Package Details</th>
                      <th>Price</th>
                      <th>Edit</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stays.stayPricingDetails.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.packageName}</td>
                          <td>{item.packageDetails}</td>
                          <td>{item.price}</td>
                          <td>
                            <EditPricing
                              price={item}
                              onUpdateStay={() => getStay()}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="stay-trash-button"
                              onClick={(e) => {
                                deletePricing(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
            </Row>
          </Container>
          <br />

          <Container className="add-stay-group-border">
            <Row>
              <Col>
                <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
                  Others
                </h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{ display: "flex" }}>
                  Amenities:{" "}
                  <div style={{ marginTop: "-2px", paddingLeft: "17px" }}>
                    <AddAmenities id={stays.id} onUpdate={() => getStay()} />
                  </div>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Amenities</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stays.stayAmenitiesDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.amenity}</td>
                          <td>
                            <EditAmenities
                              amenity={item}
                              onUpdateStay={() => getStay()}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="stay-trash-button"
                              onClick={(e) => {
                                deleteAmenity(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
              <Col>
                <div style={{ display: "flex" }}>
                  Activities:{" "}
                  <div style={{ marginTop: "-2px", paddingLeft: "17px" }}>
                    <AddActivities id={stays.id} onUpdate={() => getStay()} />
                  </div>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Activities</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stays.stayActivitiesDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.activity}</td>
                          <td>
                            <EditActivities
                              activity={item}
                              onUpdateStay={() => getStay()}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="stay-trash-button"
                              onClick={(e) => {
                                deleteActivity(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{ display: "flex" }}>
                  Facilities:{" "}
                  <div style={{ marginTop: "-2px", paddingLeft: "17px" }}>
                    <AddFacilities id={stays.id} onUpdate={() => getStay()} />
                  </div>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Facilities</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stays.otherFacilityDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.facility}</td>
                          <td>
                            <EditFacilities
                              facility={item}
                              onUpdateStay={() => getStay()}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="stay-trash-button"
                              onClick={(e) => {
                                deleteFacility(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
              <Col>
                <div style={{ display: "flex" }}>
                  Near By Places:{" "}
                  <div style={{ marginTop: "-2px", paddingLeft: "17px" }}>
                    <AddNearByPlaces id={stays.id} onUpdate={() => getStay()} />
                  </div>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Near by Places</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stays.nearByPlacesDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.placeName}</td>
                          <td>
                            <EditNearByePlaces
                              placeName={item}
                              onUpdateStay={() => getStay()}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="stay-trash-button"
                              onClick={(e) => {
                                deleteNearByPlaces(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row>
          </Container>
          <br />

          <Container className="add-stay-group-border">
            <Row>
              <Col>
                <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
                  Stay Images:
                </h4>
              </Col>
              <Col style={{ marginLeft: "-48rem", marginTop: "-3px" }}>
                <AddImage id={stays.id} onUpdate={getStay} />
              </Col>
            </Row>

            <Row>
              <div>
                {stays.images.map((i) => (
                  <div
                    key={i}
                    style={{
                      display: "inline-block",
                      position: "relative",
                      margin: "10px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <Image
                        key={i.id}
                        rounded
                        src={i.imageUrl}
                        alt="Selected"
                        style={{
                          width: "18rem",
                          height: "17rem",
                          padding: "8px",
                        }}
                        loading={lazy}
                      />
                    </div>
                    {!i.default && (
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="image-trash-button edit-image-trash-style"
                        onClick={(e) => {
                          deleteImage(i.id);
                        }}
                      />
                    )}
                    {!i.default && (
                      <Button
                        className="set-as-default-style custom-btn"
                        onClick={() => setDefaultImage(i.id)}
                        size="sm"
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Row>
            <br />
          </Container>
        </Container>
        <br />
      </Form>
      <LoadingModal show={loading} />
    </div>
  );
}

export default EditStays;
