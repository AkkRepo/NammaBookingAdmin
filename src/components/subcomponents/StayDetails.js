import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//css
import {
  Table,
  Row,
  Col,
  Button,
  Container,
  Form,
  Image,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

//pages
import AppNav from "../header/AppNav";
import { StaysService } from "../../services/Stays";
import Loading from "../pages/Others/Loading";

function StayDetails() {
  const [showM, set_Show_M] = useState(false);
  const [modalData, setModalData] = useState([]);
  const modalShow = () => {
    set_Show_M(true);
  };
  const closeModal = () => {
    setModalData([]);
    set_Show_M(false);
  };
  const openModalHandle = (bedDetails) => {
    setModalData(bedDetails);
    modalShow();
  };

  const { id } = useParams();
  const [stay, setStay] = useState();
  const [loading, setLoading] = useState(false);
  const [openImage, setImage] = useState("");
  const getStay = async () => {
    setLoading(true);
    try {
      const res = await StaysService.getStaysById(id);
      if (res.status === 200) {
        setStay(res.data);
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

  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      {stay?.id && !loading && (
        <Container>
          <header id="header">
            <AppNav />
          </header>

          <h1 className="brownbear stays-h1 heading-color">
            {" "}
            View Stay details
          </h1>
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Stay's Basic Details
            </h4>
            <Container style={{ display: "flex" }}>
              <Container>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Stay name:</h6>
                  <p style={{ paddingLeft: "100px" }}>{stay.name}</p>
                </Container>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Location:</h6>
                  <p style={{ paddingLeft: "117px" }}>
                    {stay.locationDetails.location}
                  </p>
                </Container>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Rating:</h6>
                  <p style={{ paddingLeft: "132px" }}>{stay.rating}</p>
                </Container>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Price Starts from:</h6>
                  <p style={{ paddingLeft: "50px" }}>{stay.priceStartsFrom}</p>
                </Container>
              </Container>
              <Container>
                <Col>
                  <Container
                    style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                  >
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Sl no</th>
                          <th>Categories</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stay.stayCategoriesDetails.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.categoryDetails.category}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Container>
                </Col>
              </Container>
            </Container>
            <Container style={{ display: "flex", paddingLeft: "2rem" }}>
              <h6 className="stay-id-decor">About Stay:</h6>
              <p style={{ paddingLeft: "112px" }}>{stay.about}</p>
            </Container>
          </Container>
          <br />
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Accomodation Details
            </h4>
            <Row>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Accomodation Type:</h6>
                  <p style={{ paddingLeft: "50px" }}>
                    {stay.accommodationType}
                  </p>
                </Container>
              </Col>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Accomodation:</h6>
                  <p style={{ paddingLeft: "50px" }}>{stay.accommodation}</p>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Rooms:</h6>
                  <p style={{ paddingLeft: "50px" }}>{stay.noOfRooms}</p>
                </Container>
              </Col>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Beds:</h6>
                  <p style={{ paddingLeft: "50px" }}>{stay.noOfBeds}</p>
                </Container>
              </Col>
            </Row>
          </Container>
          <br />
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Accommodation Types
            </h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sl no</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Package Includes</th>
                  <th>Bed Details</th>
                  <th>No. of Rooms</th>
                  <th>No. of Guests</th>
                </tr>
              </thead>
              <tbody>
                {stay.accommodationTypesDetails.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.roomName}</td>
                      <td>{item.price}</td>
                      <td>{item.includedPackages}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          size="lg"
                          className="custom-icon"
                          onClick={() => openModalHandle(item.bedDetails)}
                          style={{ paddingLeft: "4rem" }}
                        />
                      </td>
                      <td>{item.noOfRooms}</td>
                      <td>{item.noOfGuests}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Container>
          <br />
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>Others</h4>
            <Row>
              <Col>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Amenities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stay.stayAmenitiesDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.amenity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
              <Col>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Activities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stay.stayActivitiesDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Facilities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stay.otherFacilityDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.facility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
              <Col>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Near by Places</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stay.nearByPlacesDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.placeName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Terms and Conditions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stay.stayTAndCDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.tandc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row> */}
          </Container>
          <br />
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              House Policies
            </h4>
            <h5 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Check In/Out time:
            </h5>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Check-In Time:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.checkInTime}
              </p>
            </Container>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Check-Out Time:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.checkOutTime}
              </p>
            </Container>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Smoking:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.smoking}
              </p>
            </Container>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Pets:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.pets}
              </p>
            </Container>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Couple friendly:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.coupleFriendly}
              </p>
            </Container>
            <h5 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Children's Payment:
            </h5>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Children below 5 year:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.childrenBelow5}
              </p>
            </Container>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Children aged 5-10 year:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.children5To10}
              </p>
            </Container>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Children above 10 year:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.childrenAbove10}
              </p>
            </Container>
            <h5 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Food Policy:
            </h5>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Included meals:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.includedMeals}
              </p>
            </Container>
            <Container style={{ display: "flex" }}>
              <h6 className="stay-id-decor">Extra starters:</h6>
              <p style={{ paddingLeft: "10px" }}>
                {stay.stayHousePolicyDetails.extraStarters}
              </p>
            </Container>
          </Container>
          <br />
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Stay Contact Details
            </h4>
            <Row>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Contact name:</h6>
                  <p style={{ paddingLeft: "10px" }}>
                    {stay.contactPersonName}
                  </p>
                </Container>
              </Col>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Contact number:</h6>
                  <p style={{ paddingLeft: "10px" }}>
                    {stay.contactPersonNumber}
                  </p>
                </Container>
              </Col>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Address of the stay:</h6>
                  <p style={{ paddingLeft: "10px" }}>{stay.address}</p>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Google Location Link:</h6>
                  <p style={{ paddingLeft: "10px" }}>{stay.googleMapLink}</p>
                </Container>
              </Col>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Instagram Link:</h6>
                  <p style={{ paddingLeft: "10px" }}>{stay.instagramLink}</p>
                </Container>
              </Col>
              <Col>
                <Container style={{ display: "flex" }}>
                  <h6 className="stay-id-decor">Facebook Link:</h6>
                  <p style={{ paddingLeft: "10px" }}>{stay.facebookLink}</p>
                </Container>
              </Col>
            </Row>
          </Container>
          <br />
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Stay Images
              <br />
              {stay.images.map((i) => (
                <Image
                  key={i.id}
                  rounded
                  src={i.imageUrl}
                  alt="Selected"
                  style={{ width: "15rem", height: "17rem", padding: "20px" }}
                />
              ))}
            </h4>
          </Container>
          <br />
        </Container>
      )}
      {loading && <Loading />}

      <Modal show={showM} onHide={closeModal} data={modalData}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title style={{ paddingLeft: "9rem" }}>Bed Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: "2rem" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No of Beds</th>
                  <th>Bed Type</th>
                </tr>
              </thead>
              {modalData.map((bed, index) => {
                return (
                  <tr key={index}>
                    <td style={{ paddingLeft: "2rem" }}>{bed.noOfBeds}</td>
                    <td>{bed.bedType}</td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeModal}
            className="text-danger"
          >
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default StayDetails;
