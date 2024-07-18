import React, { useEffect, useState } from "react";

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
import { faX } from "@fortawesome/free-solid-svg-icons";
//page
import AppNav from "../header/AppNav";
import { CategoriesService } from "../../services/Categories";
import { LocationsService } from "../../services/Locations";
import { Capitalize } from "../../core/utils";
import { useNavigate } from "react-router-dom";
import { StaysService } from "../../services/Stays";
import { LoadingModal } from "../pages/Others/Index";

function AddStays() {
  //const [newRoomType, setNewRoomType] = useState("");
  //const [newBed, setBed] = useState("");
  //Rating single decimal implementation start

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");

  const handleRatingChange = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,1}$/; // Allows numbers with up to one decimal place

    if (regex.test(value) || value === "") {
      setRating(value);
      setError("");
    } else {
      setError("Please enter a valid rating with one decimal place.");
    }
  };
  //Rating single decimal implementation end

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, e.g., sending rating to server
    console.log("Submitted rating:", rating);
    // Reset the rating after submission
    setRating(0);
  };

  // Image upload
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          // const base64String = reader.result;
          // const slicedBase64String = base64String.slice(27); // Example length
          // resolve(slicedBase64String);
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Images) => {
      console.log(base64Images); // Display the base64 images in the console
      setImages((prevImages) => [...prevImages, ...base64Images]);
    });
  };

  const handleRemoveImage = (index) => {
    console.log(`Removing image at index ${index}:`, images[index]);
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleImageBase64 = (e) => {
    //const file = e.target.files[0];
    const file = Array.from(e.target.files);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages({ ...stays, images: reader.result.split(",")[1] });
      };
      reader.readAsDataURL(file);
    }
  };

  //Amenities multiple input start
  const [amenitiesArray, setAmenitiestArray] = useState([]);
  const [amenitiesInputData, setAmenitiesInputData] = useState({
    amenities: "",
  });

  // Function to handle input change
  const amenitiesInputChange = (e) => {
    setAmenitiesInputData({
      ...amenitiesInputData,
      amenities: e.target.value,
    });
  };

  // Function to add input data
  const addAmenitiesInputData = () => {
    if (amenitiesInputData.amenities.trim() !== "") {
      setAmenitiestArray([...amenitiesArray, amenitiesInputData]);
      setAmenitiesInputData({ amenities: "" });
    } else {
      // Notify user that the input field should not be empty
      alert("Amenities should not be empty");
    }
  };

  // Function to delete data
  const deleteAmenitiesData = (index) => {
    const updatedArray = amenitiesArray.filter((item, i) => i !== index);
    setAmenitiestArray(updatedArray);
  };
  //Amenities myltiple input end

  //Activities multiple input start
  const [activitiesArray, setActivitiestArray] = useState([]);
  const [activitiesInputData, setActivitiesInputData] = useState({
    activities: "",
  });

  // Function to handle input change
  const activitiesInputChange = (e) => {
    setActivitiesInputData({
      ...activitiesInputData,
      activities: e.target.value,
    });
  };

  // Function to add input data
  const addActivitiesInputData = () => {
    if (activitiesInputData.activities.trim() !== "") {
      setActivitiestArray([...activitiesArray, activitiesInputData]);
      setActivitiesInputData({ activities: "" });
    } else {
      // Notify user that the input field should not be empty
      alert("Activities should not be empty");
    }
  };

  // Function to delete data
  const deleteActivitiesData = (index) => {
    const updatedArray = activitiesArray.filter((item, i) => i !== index);
    setActivitiestArray(updatedArray);
  };
  //Activities myltiple input end

  //Facilities multiple input start
  const [facilitiesArray, setFacilitiestArray] = useState([]);
  const [facilitiesInputData, setFacilitiesInputData] = useState({
    facilities: "",
  });

  // Function to handle input change
  const facilitiesInputChange = (e) => {
    setFacilitiesInputData({
      ...facilitiesInputData,
      facilities: e.target.value,
    });
  };

  // Function to add input data
  const addFacilitiesInputData = () => {
    if (facilitiesInputData.facilities.trim() !== "") {
      setFacilitiestArray([...facilitiesArray, facilitiesInputData]);
      setFacilitiesInputData({ facilities: "" });
    } else {
      // Notify user that the input field should not be empty
      alert("Facilities should not be empty");
    }
  };

  // Function to delete data
  const deleteFacilitiesData = (index) => {
    const updatedArray = facilitiesArray.filter((item, i) => i !== index);
    setFacilitiestArray(updatedArray);
  };
  //Facilities myltiple input end

  //near by places multiple input start
  const [nearByPlacesArray, setNearByPlacestArray] = useState([]);
  const [nearByPlacesInputData, setNearByPlacesInputData] = useState({
    nearByPlaces: "",
  });

  // Function to handle input change
  const nearByPlacesInputChange = (e) => {
    setNearByPlacesInputData({
      ...nearByPlacesInputData,
      nearByPlaces: e.target.value,
    });
  };

  // Function to add input data
  const addNearByPlacesInputData = () => {
    if (nearByPlacesInputData.nearByPlaces.trim() !== "") {
      setNearByPlacestArray([...nearByPlacesArray, nearByPlacesInputData]);
      setNearByPlacesInputData({ nearByPlaces: "" });
    } else {
      // Notify user that the input field should not be empty
      alert("Near by Places should not be empty");
    }
  };

  // Function to delete data
  const deleteNearByPlacesData = (index) => {
    const updatedArray = nearByPlacesArray.filter((item, i) => i !== index);
    setNearByPlacestArray(updatedArray);
  };
  //near by places myltiple input end

  //terms and condition multiple input start
  let [termsAndConditionArray, setTermsAndConditionArray] = useState([]);
  let [termsAndConditionInputData, setTermsAndConditionInputData] = useState({
    termsAndCondition: "",
  });
  function data2(e) {
    setTermsAndConditionInputData({
      ...termsAndConditionArray,
      termsAndCondition: e.target.value,
    });
  }
  let termsAndCondition = termsAndConditionInputData;
  function addTermsAndConditionInputData() {
    // Check if the input field is not empty
    if (termsAndConditionInputData.termsAndCondition.trim() !== "") {
      setTermsAndConditionArray([...termsAndConditionArray, termsAndCondition]);
      console.log(termsAndConditionInputData);
      setTermsAndConditionInputData({ termsAndCondition: "" });
    } else {
      // Display an alert or handle the empty input case in some other way
      alert("Please enter Terms & Conditions");
    }
  }

  function deleteTermsAndConditionInputData(i) {
    console.log(i, "this index row wants to be deleted");
    let total2 = [...termsAndConditionArray];
    total2.splice(i, 1);
    setTermsAndConditionArray(total2);
  }
  //terms and condition multiple input end

  //Pricing multiple input start

  {
    /*
  const addNewRoom_1 = () => {
    // Check if newRoom and newRoomType are not empty
    if (newRoom && newRoomType) {
      let roomsList = pricingInputData.noOfRooms;
      let roomTypesList = pricingInputData.roomType;

      roomsList.push(newRoom);
      roomTypesList.push(newRoomType);

      setPricingInputData({
        ...pricingInputData,
        noOfRooms: roomsList,
        roomType: roomTypesList,
      });

      // Clear the inputs after adding the room
      setRooms("");
      setNewRoomType("");

      console.log(pricingInputData);
    } else {
      // Handle the case where newRoom or newRoomType is empty
      alert("No room data provided. Please enter the room details.");
      // You can also set an error state and display it in your UI
      // setError("No room data provided. Please enter the room details.");
    }
  }; */
  }

  const [newRoom, setRooms] = useState({
    noofRooms: "",
    roomType: "",
  });
  const addNewRoom = () => {
    if (newRoom.noofRooms && newRoom.roomType) {
      let list = pricingInputData.roomDetails;
      list.push(newRoom);
      setPricingInputData({
        ...pricingInputData,
        roomDetails: list,
      });
      setRooms({ noofRooms: "", roomType: "" });
      console.log(pricingInputData);
    } else {
      alert("No bed data provided. Please enter the room details.");
    }
  };
  const deleteNewRoom = (ind) => {
    let list = pricingInputData.roomDetails;
    list.splice(ind, 1);
    setPricingInputData({
      ...pricingInputData,
      roomDetails: list,
    });

    console.log(pricingInputData);
  };

  {
    /*
  const addNewBed = () => {
    if (newBed) {
      let list = pricingInputData.noOfBeds;
      list.push(newBed);
      setPricingInputData({
        ...pricingInputData,
        noOfBeds: list,
      });
      setBed("");
      console.log(pricingInputData);
    } else {
      alert("No bed data provided. Please enter the room details.");
    }
  }; */
  }
  const [pricingInputData, setPricingInputData] = useState({
    roomsName: "",
    price: "",
    packageIncludes: "",
    roomDetails: [],
    //noOfRooms: [],
    //roomType: [],
    noOfGuests: "",
  });

  const [pricingInputArr, setPricingInputArr] = useState([]);
  let {
    roomsName,
    price,
    packageIncludes,
    roomDetails,
    //noOfRooms,
    //roomType,
    noOfGuests,
  } = pricingInputData;
  function addData() {
    // Check if any of the fields are empty
    if (
      !roomsName ||
      !price ||
      !packageIncludes ||
      !roomDetails ||
      //!(noOfRooms.length > 0) ||
      //!roomType ||
      !noOfGuests
    ) {
      alert("All fields are required");
      return;
    }

    // Add data to the array
    setPricingInputArr([
      ...pricingInputArr,
      {
        roomsName,
        price,
        packageIncludes,
        //noOfRooms,
        //roomType,
        roomDetails,
        noOfGuests,
      },
    ]);

    // Reset input fields
    setPricingInputData({
      roomsName: "",
      price: "",
      packageIncludes: "",
      roomDetails: [],
      //noOfRooms: [],
      //roomType: [],
      noOfGuests: "",
    });
  }
  function pricingDeleteData(i) {
    console.log(i, "this index row wants to be deleted");
    let total1 = [...pricingInputArr];
    total1.splice(i, 1);
    setPricingInputArr(total1);
  }
  //Pricing multiple input end

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
  //Categories end

  //location start
  const [locations, setLocations] = useState([]);
  const getLocations = async () => {
    try {
      const res = await LocationsService.getAllLocations();
      if (res.data?.length > 0) {
        setLocations(res.data);
      } else {
        setLocations([]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);
  //location end

  //post operation
  const navigate = useNavigate();
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
    stayAmenitiesDetails: [],
    stayActivitiesDetails: [],
    otherFacilityDetails: [],
    nearByPlacesDetails: [],
    stayTAndCDetails: [],
    images: [""],
  });

  const [addError, setAddError] = useState({
    name: "",
    locationId: "",
    rating: "",
    priceStartsFrom: "",
    select: "",
    about: "",
    accommodationType: "",
    accommodation: "",
    noOfRooms: "",
    noOfBeds: "",
    stayCategoriesDetails: "",
    accommodationTypesDetails: "",
    stayAmenitiesDetails: "",
    stayTAndCDetails: "",
    contactPersonName: "",
    contactPersonNumber: "",
    googleMapLink: "",
    address: "",
    images: "",
  });
  const validation = () => {
    let tempError = {
      name: "",
      locationId: "",
      rating: "",
      priceStartsFrom: "",
      select: "",
      about: "",
      accommodationType: "",
      accommodation: "",
      noOfRooms: "",
      noOfBeds: "",
      stayCategoriesDetails: "",
      accommodationTypesDetails: "",
      stayAmenitiesDetails: "",
      stayTAndCDetails: "",
      contactPersonName: "",
      contactPersonNumber: "",
      googleMapLink: "",
      address: "",
      images: "",
    };
    let valid = true;
    if (!stays.name) {
      tempError.name = "Name is required";
      valid = false;
    }
    if (!stays.locationId) {
      tempError.locationId = "Location is required";
      valid = false;
    }
    if (!stays.rating || stays.rating <= 0) {
      tempError.rating = "Rating is required";
      valid = false;
    }
    if (!stays.priceStartsFrom) {
      tempError.priceStartsFrom = "Price Starts From is required";
      valid = false;
    }
    if (!stays.select) {
      tempError.select = "Select is required";
      valid = false;
    }
    if (!stays.about) {
      tempError.about = "About stay is required";
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
      tempError.contactPersonName = "Contact name is required";
      valid = false;
    }
    if (!stays.contactPersonNumber) {
      tempError.contactPersonNumber = "Contact number is required";
      valid = false;
    }
    if (!stays.googleMapLink) {
      tempError.googleMapLink = "Location is required";
      valid = false;
    }
    if (!stays.address) {
      tempError.address = "Address is required";
      valid = false;
    }
    if (selectedOptions.length === 0) {
      tempError.stayCategoriesDetails = "Categories is required";
      valid = false;
    }
    if (amenitiesArray.length === 0) {
      tempError.stayAmenitiesDetails = "Amenity is required";
      valid = false;
    }
    if (termsAndConditionArray.length === 0) {
      tempError.stayTAndCDetails = "Terms and Condition is required";
      valid = false;
    }
    if (pricingInputArr.length === 0) {
      tempError.accommodationTypesDetails = "Accomodation Type is required";
      valid = false;
    }
    if (!stays.images) {
      tempError.images = "images is required";
      valid = false;
    }

    setAddError(tempError);
    return valid;
  };
  const submitStays = () => {
    if (validation() || true) {
      addStays();
    }
  };
  const addStays = async () => {
    setLoading(true);
    try {
      const res = await StaysService.addStays({
        ...stays,
        name: stays.name,
        locationId: Number(stays.locationId),
        rating: Number(rating),
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
        priceStartsFrom: stays.priceStartsFrom + " " + stays.select,
        stayCategoriesDetails: selectedOptions.map((x) => ({
          categoryId: x.id,
        })),
        accommodationTypesDetails: pricingInputArr.map((x) => ({
          roomName: x.roomsName,
          price: x.price,
          includedPackages: x.packageIncludes,
          noOfGuests: x.noOfGuests,
          roomDetails: x.roomDetails.map((x) => ({
            noOfRooms: Number(x.noofRooms),
            roomType: x.roomType,
          })),
          //roomDetails: [
          // {
          //  noOfRooms: 1,
          /// roomType: "room Type",
          // },
          //],
        })),
        stayAmenitiesDetails: amenitiesArray.map((x) => ({
          amenity: x.amenities,
        })),
        stayActivitiesDetails: activitiesArray.map((x) => ({
          activity: x.activities,
        })),
        otherFacilityDetails: facilitiesArray.map((x) => ({
          facility: x.facilities,
        })),
        nearByPlacesDetails: nearByPlacesArray.map((x) => ({
          placeName: x.nearByPlaces,
        })),
        stayTAndCDetails: termsAndConditionArray.map((x) => ({
          tandc: x.termsAndCondition,
        })),
        images: images,
        //images: ["images"],
      });
      if (res.status === 200) {
        alert(res.message);
        navigate("/dashboard/addStays");
      } else {
        alert("Else error");
      }
      setLoading(false);
    } catch (error) {
      alert("Catch error");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <header id="header">
        <AppNav />
      </header>
      
      <h1 className="brownbear stays-h1 heading-color">Add New Stay</h1>

      <Form onSubmit={handleSubmit}>
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
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Stay's Basic Details
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="stayName"
                  label="Stay Name*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Please enter Stay name"
                    style={{ textTransform: "capitalize" }}
                    value={stays.name}
                    onChange={(e) =>
                      setStays({ ...stays, name: e.target.value })
                    }
                    isInvalid={!!addError.name}
                  />
                  <p className="required-field-meassage">{addError.name}</p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="location" label="Location*">
                  <Form.Select
                    aria-label="Location*"
                    value={stays.locationId}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        locationId: e.target.value,
                      })
                    }
                    isInvalid={!!addError.locationId}
                  >
                    <option>Select</option>
                    {locations.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.location}
                      </option>
                    ))}
                  </Form.Select>
                  <p className="required-field-meassage">
                    {addError.locationId}
                  </p>
                </FloatingLabel>
              </Col>{" "}
              <Col>
                <FloatingLabel
                  controlId="rating"
                  label="Rating*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Rating"
                    value={rating}
                    onChange={handleRatingChange}
                    isInvalid={!!error || !!addError.rating}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error ? error : addError.rating}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle
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
                        key={i.id}
                        type="checkbox"
                        id={i.id}
                        label={i.category}
                        checked={selectedOptions.includes(i)}
                        onChange={() => handleCheckboxChange(i)}
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <p className="required-field-meassage">
                  {addError.stayCategoriesDetails}
                </p>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="priceStartsFrom"
                  label="Price starts from*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Please enter Price"
                    value={stays.priceStartsFrom}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        priceStartsFrom: e.target.value,
                      })
                    }
                    isInvalid={!!addError.priceStartsFrom}
                  />
                  <p className="required-field-meassage">
                    {addError.priceStartsFrom}
                  </p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="select" label="Select*">
                  <Form.Select
                    aria-label="Select*"
                    value={stays.select}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        select: e.target.value,
                      })
                    }
                    isInvalid={!!addError.select}
                  >
                    <option>Select</option>
                    <option value="Price / Per Person">
                      Price / Per Person
                    </option>
                    <option value="Price / Per Room">Price / Per Room</option>
                  </Form.Select>
                  <p className="required-field-meassage">{addError.select}</p>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="aboutStay" label="About Stay*">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    value={stays.about}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        about: e.target.value,
                      })
                    }
                    isInvalid={!!addError.about}
                  />
                  <p className="required-field-meassage">{addError.about}</p>
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
          <br />

          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Accomodation Details
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="accomodationType"
                  label="Accomodation Type*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Accomodation Tyoe"
                    style={{ textTransform: "capitalize" }}
                    value={stays.accommodationType}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        accommodationType: e.target.value,
                      })
                    }
                    isInvalid={!!addError.accommodationType}
                  />
                  <p className="required-field-meassage">
                    {addError.accommodationType}
                  </p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
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
                    isInvalid={!!addError.accommodation}
                  />
                  <p className="required-field-meassage">
                    {addError.accommodation}
                  </p>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
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
                      setStays({
                        ...stays,
                        noOfRooms: e.target.value,
                      })
                    }
                    isInvalid={!!addError.noOfRooms}
                  />
                  <p className="required-field-meassage">
                    {addError.noOfRooms}
                  </p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="beds" label="Beds*" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Beds"
                    style={{ textTransform: "capitalize" }}
                    value={stays.noOfBeds}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        noOfBeds: e.target.value,
                      })
                    }
                    isInvalid={!!addError.noOfBeds}
                  />
                  <p className="required-field-meassage">{addError.noOfBeds}</p>
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
          <br />
          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Accomodation Types
              <p className="required-field-meassage">
                {addError.accommodationTypesDetails}
              </p>
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="roomsName"
                  label="Room Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    style={{ textTransform: "capitalize" }}
                    value={pricingInputData.roomsName}
                    onChange={(e) => {
                      setPricingInputData({
                        ...pricingInputData,
                        roomsName: Capitalize(e.target.value),
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="price" label="Price" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    style={{ textTransform: "capitalize" }}
                    value={pricingInputData.price}
                    onChange={(e) => {
                      setPricingInputData({
                        ...pricingInputData,
                        price: e.target.value,
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="packageIncludes"
                    label="Package Includes"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      style={{ textTransform: "capitalize" }}
                      value={pricingInputData.packageIncludes}
                      onChange={(e) => {
                        setPricingInputData({
                          ...pricingInputData,
                          packageIncludes: e.target.value,
                        });
                      }}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="noOfRooms"
                    label="Total no. of Rooms"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="No. of Rooms"
                      style={{ textTransform: "capitalize" }}
                      value={newRoom.noofRooms}
                      onChange={(e) => {
                        setRooms({
                          ...newRoom,
                          noofRooms: Number(e.target.value),
                        });
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col style={{ display: "flex" }}>
                  <FloatingLabel
                    controlId="roomType"
                    label="Room Type"
                    className="mb-3"
                    style={{ width: "27rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Room type"
                      style={{ textTransform: "capitalize" }}
                      value={newRoom.roomType}
                      onChange={(e) => {
                        setRooms({ ...newRoom, roomType: e.target.value });
                      }}
                    />
                  </FloatingLabel>
                  <div
                    style={{
                      paddingLeft: "1rem",
                      paddingTop: "0.5rem",
                      width: "5rem",
                    }}
                  >
                    <Button
                      onClick={addNewRoom}
                      className="custom-btn"
                      style={{ height: "3rem" }}
                    >
                      Add
                    </Button>
                  </div>
                </Col>
              </Row>
              <Container style={{ paddingRight: "8rem" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Rooms</th>
                      <th>Room type</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingInputData?.roomDetails?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.noofRooms}</td>
                        <td>{item.roomType}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faX}
                            onClick={() => deleteNewRoom(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="noOfGuests"
                    label="No. of Guests"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="No. of Guests"
                      style={{ textTransform: "capitalize" }}
                      value={pricingInputData.noOfGuests}
                      onChange={(e) => {
                        setPricingInputData({
                          ...pricingInputData,
                          noOfGuests: e.target.value,
                        });
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <Button onClick={addData} className="custom-btn-reverse">
                    Add Accomodation Types
                  </Button>
                </Col>
              </Row>
              <Container style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Package Includes</th>
                      <th>Number of Rooms</th>
                      <th>Room Type</th>
                      <th>Number of Guests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingInputArr.map((info, i) => {
                      return (
                        <tr>
                          <td>{info.roomsName}</td>
                          <td>{info.price}</td>
                          <td>{info.packageIncludes}</td>
                          <td>
                            {info.roomDetails.map((x) => x.noofRooms).join(",")}
                          </td>
                          <td>
                            {info.roomDetails.map((x) => x.roomType).join(",")}
                          </td>

                          <td>{info.noOfGuests}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => pricingDeleteData(i)}
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
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>Others</h4>
            <Row>
              <Col>
                <div style={{ display: "flex" }}>
                  <FloatingLabel
                    controlId="amenities"
                    label="Amenities*"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Please enter Amenities"
                      style={{ textTransform: "capitalize" }}
                      value={amenitiesInputData.amenities}
                      onChange={amenitiesInputChange}
                    />
                  </FloatingLabel>
                  <Button
                    onClick={addAmenitiesInputData}
                    style={{ height: "40px" }}
                    className="custom-btn-reverse"
                  >
                    Add
                  </Button>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Amenities</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amenitiesArray.map((item, index) => (
                        <tr key={index}>
                          <td>{item.amenities}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteAmenitiesData(index)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <p className="required-field-meassage">
                    {addError.stayAmenitiesDetails}
                  </p>
                </Container>
              </Col>
              <Col>
                <div style={{ display: "flex" }}>
                  <FloatingLabel
                    controlId="activities"
                    label="Activities*"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Please enter Activities"
                      style={{ textTransform: "capitalize" }}
                      value={activitiesInputData.activities}
                      onChange={activitiesInputChange}
                    />
                  </FloatingLabel>
                  <Button
                    onClick={addActivitiesInputData}
                    style={{ height: "40px" }}
                    className="custom-btn-reverse"
                  >
                    Add
                  </Button>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Activities</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activitiesArray.map((item, index) => (
                        <tr key={index}>
                          <td>{item.activities}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteActivitiesData(index)}
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
                  <FloatingLabel
                    controlId="facilities"
                    label="Facilities*"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Please enter Facilities"
                      style={{ textTransform: "capitalize" }}
                      value={facilitiesInputData.facilities}
                      onChange={facilitiesInputChange}
                    />
                  </FloatingLabel>
                  <Button
                    onClick={addFacilitiesInputData}
                    style={{ height: "40px" }}
                    className="custom-btn-reverse"
                  >
                    Add
                  </Button>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Facilities</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facilitiesArray.map((item, index) => (
                        <tr key={index}>
                          <td>{item.facilities}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteFacilitiesData(index)}
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
                  <FloatingLabel
                    controlId="nearByPlaces"
                    label="Near by Places*"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Please enter Near By Places"
                      style={{ textTransform: "capitalize" }}
                      value={nearByPlacesInputData.nearByPlaces}
                      onChange={nearByPlacesInputChange}
                    />
                  </FloatingLabel>
                  <Button
                    onClick={addNearByPlacesInputData}
                    style={{ height: "40px" }}
                    className="custom-btn-reverse"
                  >
                    Add
                  </Button>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Near by Places</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nearByPlacesArray.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nearByPlaces}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteNearByPlacesData(index)}
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
                  <FloatingLabel
                    controlId="termsAndCondition"
                    label="Terms & Conditions*"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Please enter T&C"
                      style={{ height: "100px", width: "30rem" }}
                      value={termsAndConditionInputData.termsAndCondition || ""}
                      onChange={data2}
                    />
                    <p className="required-field-meassage">
                      {addError.stayTAndCDetails}
                    </p>
                  </FloatingLabel>
                  <Button
                    onClick={addTermsAndConditionInputData}
                    style={{ height: "40px" }}
                    className="custom-btn-reverse"
                  >
                    Add
                  </Button>
                </div>
                <Container
                  style={{ paddingRight: "8rem", marginLeft: "-1rem" }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Terms and Conditions</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {termsAndConditionArray &&
                        termsAndConditionArray.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.termsAndCondition} </td>
                              <td>
                                <FontAwesomeIcon
                                  icon={faX}
                                  onClick={() =>
                                    deleteTermsAndConditionInputData(i)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row>
          </Container>
          <br />

          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Stay Contact Details
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="contactName"
                  label="Contact Name*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Please enter contact name"
                    style={{ textTransform: "capitalize" }}
                    value={stays.contactPersonName}
                    onChange={(e) =>
                      setStays({ ...stays, contactPersonName: e.target.value })
                    }
                    isInvalid={!!addError.contactPersonName}
                  />
                  <p className="required-field-meassage">
                    {addError.contactPersonName}
                  </p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="contactNumber"
                  label="Contact Number*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Please enter contact number"
                    value={stays.contactPersonNumber}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        contactPersonNumber: e.target.value,
                      })
                    }
                    isInvalid={!!addError.contactPersonNumber}
                  />
                  <p className="required-field-meassage">
                    {addError.contactPersonNumber}
                  </p>
                </FloatingLabel>
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
                      setStays({
                        ...stays,
                        googleMapLink: e.target.value,
                      })
                    }
                    isInvalid={!!addError.googleMapLink}
                  />
                  <p className="required-field-meassage">
                    {addError.googleMapLink}
                  </p>
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
                      setStays({
                        ...stays,
                        instagramLink: e.target.value,
                      })
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
                      setStays({
                        ...stays,
                        facebookLink: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="aboutStay"
                  label="Address of the stay"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    value={stays.address}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        address: e.target.value,
                      })
                    }
                    isInvalid={!!addError.address}
                  />
                  <p className="required-field-meassage">{addError.address}</p>
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
          <br />

          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Stay Images
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="uploadImage"
                  label="Upload Image*"
                  className="mb-3"
                >
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <div>
                {images.map((base64Image, index) => (
                  <div
                    key={index}
                    style={{
                      display: "inline-block",
                      position: "relative",
                      margin: "10px",
                    }}
                  >
                    <Image
                      src={`data:image/jpeg;base64,${base64Image}`}
                      alt={`Uploaded ${index}`}
                      style={{ width: "200px", height: "auto" }}
                      thumbnail
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      Cancel
                    </Button>
                  </div>
                ))}
              </div>
            </Row>
          </Container>
          <Row>
            <Col>
              <br />
              <Button
                type="submit"
                className="custom-btn"
                style={{ marginRight: "1rem" }}
                onClick={submitStays}
              >
                Submit
              </Button>
              <Button className="custom-btn" type="reset">
                Clear
              </Button>
            </Col>
          </Row>
        </Container>
        <br />
      </Form>
      <LoadingModal show={loading} />
    </div>
  );
}

export default AddStays;
