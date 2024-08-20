import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { StaysService } from "../../../services/Stays";
import { CategoriesService } from "../../../services/Categories";
import { LocationsService } from "../../../services/Locations";
import { Capitalize } from "../../../core/utils";
import { LoadingModal } from "../../pages/Others/Index";

function EditBasicDetails(props) {
  //props: stays

  const [loading, setLoading] = useState(false);
  //location start
  const [locations, setLocations] = useState([]);
  const getLocations = async () => {
    setLoading(true);
    try {
      const res = await LocationsService.getAllLocations();
      if (res.data?.length > 0) {
        setLocations(res.data);
      } else {
        setLocations([]);
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);
  useEffect(() => {
    setStays({
      ...props.stays,
      price: props.stays.priceStartsFrom.split(" ")[0],
      select: props.stays.priceStartsFrom.split(" ").slice(1).join(" "),
    });
    console.log(stays);
    setRating(props.stays.rating);
    setSelectedOptions(
      props.stays.stayCategoriesDetails.map((x) => x.categoryDetails)
    );
    console.log(selectedOptions);
  }, [props.stays]);
  //location end

  //Categories start
  const [categoriesDropdown, setCategoriesDropdown] = useState([]);
  const getCategoriesDropdown = async () => {
    try {
      const res = await CategoriesService.getAllCategories();
      if (res.data?.length > 0) {
        setCategoriesDropdown(res.data);
      } else {
        setCategoriesDropdown([]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getCategoriesDropdown();
  }, []);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const removeCategory = (i) => {
    let rem = selectedOptions[i];
    let ind = stays.stayCategoriesDetails.findIndex(
      (x) => x.categoryDetails.id === rem.id
    );
    let newCat = stays.stayCategoriesDetails;
    selectedOptions.splice(i, 1);
    newCat.splice(ind, 1);
    setStays({ ...stays, stayCategoriesDetails: newCat });
  };
  //Categories end

  //Rating decimal start
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const handleRatingChange = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,1}$/; // Allows numbers with up to one decimal place

    if (regex.test(value) || value === "") {
      setRating(value);
      setStays({ ...stays, rating: value });
      setError("");
    } else {
      setError("Please enter a valid rating with one decimal place.");
    }
  };
  //Rating end

  const [stays, setStays] = useState({
    id: 0,
    name: "",
    locationDetails: {
      id: 0,
      location: "",
    },
    rating: 0,
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
    stayAmenitiesDetails: [],
    stayActivitiesDetails: [],
    otherFacilityDetails: [],
    nearByPlacesDetails: [],
    stayHousePolicyDetails: {},
    images: [],
    select: "",
    price: "",
  });

  const [valError, setValError] = useState({
    price: "",
    name: "",
    locationDetails: {
      id: 0,
      location: "",
    },
    rating: 0,
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
    stayAmenitiesDetails: [],
    stayActivitiesDetails: [],
    otherFacilityDetails: [],
    nearByPlacesDetails: [],
    stayHousePolicyDetails: {},
    images: [],
    select: "",
    price: "",
  });
  const validation = () => {
    let tempError = {
      price: "",
      name: "",
      locationDetails: {
        id: 0,
        location: "",
      },
      rating: 0,
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
      stayAmenitiesDetails: [],
      stayActivitiesDetails: [],
      otherFacilityDetails: [],
      nearByPlacesDetails: [],
      stayHousePolicyDetails: {},
      images: [],
      select: "",
      price: "",
    };
    let valid = true;
    if (!stays.name) {
      tempError.name = "Name is required";
      valid = false;
    }
    if (!stays.locationDetails) {
      tempError.locationDetails = "Location is required";
      valid = false;
    }
    if (!stays.rating) {
      tempError.rating = "Rating is required";
      valid = false;
    }
    if (!stays.stayCategoriesDetails) {
      tempError.stayCategoriesDetails = "Categories is required";
      valid = false;
    }
    if (!stays.priceStartsFrom) {
      tempError.priceStartsFrom = "Required field";
      valid = false;
    }
    if (!stays.price) {
      tempError.price = "Required field";
      valid = false;
    }
    if (!stays.about) {
      tempError.about = "Required Field";
      valid = false;
    }
    if (!stays.accommodationType) {
      tempError.accommodationType = "Accommodation Type is required";
      valid = false;
    }
    if (!stays.accommodation) {
      tempError.accommodation = "Accommodation is required";
      valid = false;
    }
    if (!stays.noOfRooms) {
      tempError.noOfRooms = "Number of rooms is required";
      valid = false;
    }
    if (!stays.noOfBeds) {
      tempError.noOfBeds = "Number of Beds is required";
      valid = false;
    }
    if (!stays.contactPersonName) {
      tempError.contactPersonName = "Contact person is required";
      valid = false;
    }
    if (!stays.contactPersonNumber) {
      tempError.contactPersonNumber = "Contact number is required";
      valid = false;
    }
    setValError(tempError);
    return valid;
  };

  const submit = async () => {
    setLoading(true);
    if (validation()) {
      try {
        const res = await StaysService.updateBasicDetails({
          id: stays.id,
          name: stays.name,
          locationId: Number(stays.locationDetails.id),
          rating: stays.rating,
          priceStartsFrom: stays.price + " " + stays.select,
          about: stays.about,
          accommodationType: stays.accommodationType,
          accommodation: stays.accommodation,
          noOfRooms: stays.noOfRooms,
          noOfBeds: stays.noOfBeds,
          contactPersonName: stays.contactPersonName,
          contactPersonNumber: stays.contactPersonNumber,
          googleMapLink: stays.googleMapLink,
          instagramLink: stays.instagramLink,
          facebookLink: stays.facebookLink,
          address: stays.address,
          stayCategoriesDetails: selectedOptions.map((x) => ({
            categoryId: x.id,
          })),
        });
        if (res.status === 200) {
          alert(res.message);
          props.onUpdateStay();
        } else {
          alert("Error when updating stays details");
        }
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
            Stay's Basic Details
          </h4>
        </Col>
        <Col>
          <div className="stays-add-button">
            <FontAwesomeIcon
              icon={faPen}
              size="lg"
              className="stay-edit-button"
              style={{ padding: "10px", borderRadius: "4rem" }}
              onClick={submit}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel
            controlId="stayName"
            label="Stay Name*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter Stay name"
              className="text-capitalize"
              value={stays.name}
              onChange={(e) => setStays({ ...stays, name: e.target.value })}
              isInvalid={!!valError.name}
            />
          </FloatingLabel>
          <p className="required-field-meassage">{valError.name}</p>
        </Col>
        <Col>
          <FloatingLabel controlId="location" label="Location*">
            <Form.Select
              required
              aria-label="Location*"
              value={stays.locationDetails?.id}
              onChange={(e) =>
                setStays({
                  ...stays,
                  locationDetails: {
                    ...stays.locationDetails,
                    id: e.target.value,
                  },
                })
              }
              //isInvalid={!!valError.locationDetails}
            >
              {/* <p className="required-field-meassage">
                {valError.locationDetails}
              </p> */}
              <option>Select</option>
              {locations.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.location}
                </option>
              ))}
            </Form.Select>
            {/* <p className="required-field-meassage">{addError.locationId}</p> */}
          </FloatingLabel>
        </Col>{" "}
        <Col>
          <FloatingLabel controlId="rating" label="Rating*" className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Rating"
              value={rating}
              onChange={handleRatingChange}
              isInvalid={!!error || !!valError.rating}
            />
            <Form.Control.Feedback
              type="invalid"
              className="required-field-meassage"
            >
              {error ? error : valError.rating}
              {/* <p className="required-field-meassage">{valError.rating}</p> */}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle
              required
              className="categories-styling"
              id="dropdown-basic"
              size="lg"
              style={{
                width: "21.5rem",
                fontSize: "1rem",
                height: "3.5rem",
              }}
            >
              Categories*
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categoriesDropdown.map((i, index) => (
                <Form.Check
                  required
                  key={i.id}
                  type="checkbox"
                  id={i.id}
                  label={i.category}
                  checked={
                    selectedOptions.includes(i) ||
                    stays.stayCategoriesDetails
                      .map((x) => x.categoryDetails.id)
                      .includes(i.id)
                  }
                  onChange={() => handleCheckboxChange(i)}
                  disabled={stays.stayCategoriesDetails
                    .map((x) => x.categoryDetails.id)
                    .includes(i.id)}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {selectedOptions.map((category, i) => (
            <span>
              {category.category}
              {i < selectedOptions.length - 1 &&
                selectedOptions.length > 1 &&
                ", "}
            </span>
          ))}
          <Col>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sl no</th>
                  <th>Categories</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {stays.stayCategoriesDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.categoryDetails.category}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="stay-trash-button"
                        onClick={() => removeCategory(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Col>
        <Col>
          <FloatingLabel
            controlId="priceStartsFrom"
            label="Price starts from*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter Price"
              value={stays.price}
              onChange={(e) => setStays({ ...stays, price: e.target.value })}
              isInvalid={!!valError.price}
            />
          </FloatingLabel>
          <p className="required-field-meassage">{valError.price}</p>
        </Col>
        <Col>
          <FloatingLabel controlId="select" label="Select*">
            <Form.Select
              required
              aria-label="Select*"
              value={stays.select}
              onChange={(e) => setStays({ ...stays, select: e.target.value })}
            >
              <option>Select</option>
              <option value="Price / Per Person">Price / Per Person</option>
              <option value="Price / Per Room">Price / Per Room</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId="aboutStay" label="About Stay*">
            <Form.Control
              required
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={stays.about}
              onChange={(e) => setStays({ ...stays, about: e.target.value })}
              isInvalid={!!valError.about}
            />
          </FloatingLabel>
          <p className="required-field-meassage">{valError.about}</p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
            Accomodation Details
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel
            controlId="accomodationType"
            label="Accomodation Type*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Accomodation Tyoe"
              className="text-capitalize"
              value={stays.accommodationType}
              onChange={(e) =>
                setStays({ ...stays, accommodationType: e.target.value })
              }
              isInvalid={!!valError.accommodationType}
            />
          </FloatingLabel>
          <p className="required-field-meassage">
            {valError.accommodationType}
          </p>
        </Col>
        <Col>
          <FloatingLabel
            required
            controlId="accomodation"
            label="Accomodation*"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Accomodation"
              style={{ textTransform: "capitalize" }}
              value={stays.accommodation}
              onChange={(e) =>
                setStays({
                  ...stays,
                  accommodation: e.target.value,
                })
              }
              isInvalid={!!valError.accommodation}
            />
          </FloatingLabel>
          <p className="required-field-meassage">{valError.accommodation}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel
            required
            controlId="rooms"
            label="Rooms*"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Rooms"
              style={{ textTransform: "capitalize" }}
              value={stays.noOfRooms}
              onChange={(e) =>
                setStays({ ...stays, noOfRooms: e.target.value })
              }
              isInvalid={!!valError.noOfRooms}
            />
          </FloatingLabel>
          <p className="required-field-meassage">{valError.noOfRooms}</p>
        </Col>
        <Col>
          <FloatingLabel controlId="beds" label="Beds*" className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Beds"
              style={{ textTransform: "capitalize" }}
              value={stays.noOfBeds}
              onChange={(e) => setStays({ ...stays, noOfBeds: e.target.value })}
              isInvalid={!!valError.noOfBeds}
            />
          </FloatingLabel>
          <p className="required-field-meassage">{valError.noOfBeds}</p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
            Stay Contact Details
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel
            controlId="contactName"
            label="Contact Name*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter contact name"
              className="text-capitalize"
              value={stays.contactPersonName}
              onChange={(e) =>
                setStays({ ...stays, contactPersonName: e.target.value })
              }
              isInvalid={!!valError.contactPersonName}
            />
          </FloatingLabel>
          <p className="required-field-meassage">
            {valError.contactPersonName}
          </p>
        </Col>
        <Col>
          <FloatingLabel
            controlId="contactNumber"
            label="Contact Number*"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Please enter contact number"
              value={stays.contactPersonNumber}
              onChange={(e) =>
                setStays({ ...stays, contactPersonNumber: e.target.value })
              }
              isInvalid={!!valError.contactPersonNumber}
            />
          </FloatingLabel>
          <p className="required-field-meassage">
            {valError.contactPersonNumber}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel
            controlId="GoogleLocationLink"
            label="Google Location link"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Please enter Google Location link"
              value={stays.googleMapLink}
              onChange={(e) =>
                setStays({ ...stays, googleMapLink: e.target.value })
              }
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="instaLink"
            label="Instagram account link"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Please enter Instagram page link"
              value={stays.instagramLink}
              onChange={(e) =>
                setStays({ ...stays, instagramLink: e.target.value })
              }
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="fbLink"
            label="Facebook account link"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Please enter Facebook link"
              value={stays.facebookLink}
              onChange={(e) =>
                setStays({ ...stays, facebookLink: e.target.value })
              }
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId="aboutStay" label="Address of the stay">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={stays.address}
              onChange={(e) => setStays({ ...stays, address: e.target.value })}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <LoadingModal show={loading} />
    </div>
  );
}

export default EditBasicDetails;
