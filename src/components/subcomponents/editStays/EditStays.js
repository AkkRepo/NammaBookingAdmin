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
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
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

function EditStays() {
  //View stay details start TEMP
  const { id } = useParams();
  // const [stays, setStay] = useState();
  const [loading, setLoading] = useState(false);
  const [openImage, setImage] = useState("");
  const getStay = async () => {
    setLoading(true);
    try {
      const res = await StaysService.getStaysById(id);
      console.log(res.data);
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
    accommodationTypesDetails: [],
    stayAmenitiesDetails: [
      {
        amenity: "",
      },
    ],
    stayActivitiesDetails: [],
    otherFacilityDetails: [],
    nearByPlacesDetails: [],
    stayHousePolicyDetails: {
      checkInTime: "",
      checkOutTime: "",
      smoking: "",
      pets: "",
      coupleFriendly: "",
      childrenBelow5: "",
      children5To10: "",
      childrenAbove10: "",
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
          alert("else error");
        }
        setLoading(false);
      }
    } catch (error) {
      alert("catch error");
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
          alert("else error");
        }
        setLoading(false);
      }
    } catch (error) {
      alert("catch error");
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
          alert("else error");
        }
        setLoading(false);
      }
    } catch (error) {
      alert("catch error");
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
          alert("else error");
        }
        setLoading(false);
      }
    } catch (error) {
      alert("catch error");
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
          alert("else error");
        }
        setLoading(false);
      }
    } catch (error) {
      alert("catch error");
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
          alert("else error");
        }
        setLoading(false);
      }
    } catch (error) {
      alert("catch error");
      setLoading(false);
    }
  };

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
          </Container>
          <br />
          <Container className="add-stay-group-border">
            <Row>
              <Col>
                <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
                  Accomodation Types:{" "}
                  {/* <p className="required-field-meassage">
                    {addError.accommodationTypesDetails}
                  </p> */}
                </h4>
              </Col>
              {/* <Col>
                <div className="stays-add-button">
                  <Button className="custom-btn">Edit</Button>
                </div>
              </Col> */}
              <Col style={{ marginLeft: "52rem" }}>
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
                      <th>Name</th>
                      <th>Price</th>
                      <th>Package Includes</th>
                      <th>No. Of Beds</th>
                      <th>Bed Type</th>
                      <th>No. of Rooms</th>
                      <th>No. of Guests</th>
                      {/* <th>Edit</th> */}
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stays.accommodationTypesDetails.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.roomName}</td>
                          <td>{item.price}</td>
                          <td>{item.includedPackages}</td>
                          <td>
                            {item.bedDetails.map((x) => x.noOfBeds).join(",")}
                          </td>
                          <td>
                            {item.bedDetails.map((x) => x.bedType).join(",")}
                          </td>

                          <td>{item.noOfRooms}</td>
                          <td>{item.noOfGuests}</td>
                          {/* <td>
                            <EditAccomodationTypes />
                          </td> */}
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
                  Stay Images
                </h4>
              </Col>
              <Col style={{ marginLeft: "57rem" }}>
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
                    <Image
                      key={i.id}
                      rounded
                      src={i.imageUrl}
                      alt="Selected"
                      style={{
                        width: "15rem",
                        height: "17rem",
                        padding: "20px",
                      }}
                      loading={lazy}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        padding: "10px",
                      }}
                      className="image-trash-button"
                      onClick={(e) => {
                        deleteImage(i.id);
                      }}
                    />
                  </div>
                ))}
              </div>
              {/* <div>
                {images.map((base64Image, index) => (
                  
                ))}
              </div> */}
            </Row>
          </Container>
        </Container>
        <br />
      </Form>
      <LoadingModal show={loading} />
    </div>
  );
}

export default EditStays;
