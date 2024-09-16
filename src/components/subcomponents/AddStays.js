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
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
//page
import AppNav from "../header/AppNav";
import { CategoriesService } from "../../services/Categories";
import { LocationsService } from "../../services/Locations";
import { Capitalize } from "../../core/utils";
import { useNavigate } from "react-router-dom";
import { StaysService } from "../../services/Stays";
import { BedTypeServices } from "../../services/BedType";
import { LoadingModal } from "../pages/Others/Index";

function AddStays() {
  const [loading, setLoading] = useState(false);
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
  // Image upload
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const selectedFiles = Array.from(files).filter((f) => f.size < 300 * 1024); // Filter files less than 300 KB
    if (selectedFiles.length !== files.length) {
      alert("Some files are larger than 300 KB and were not selected.");
      event.target.value = null;
      event.target.files = null;
      //setError({ ...error, image: "Image cannot be more than 300KB" });
      return;
    }
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
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
      amenities: Capitalize(e.target.value),
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
      activities: Capitalize(e.target.value),
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
      facilities: Capitalize(e.target.value),
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
      nearByPlaces: Capitalize(e.target.value),
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

  // Children's Paymentmultiple input start
  const [childrensPaymentArray, setChildrensPaymentArray] = useState([]);
  const [childrensPaymentInputData, setChildrensPaymentInputData] = useState({
    label: "",
    details: "",
  });

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildrensPaymentInputData({
      ...childrensPaymentInputData,
      [name]: name === "amenities" ? Capitalize(value) : value,
    });
  };

  // Function to add input data
  const addChildrensPaymentInputData = () => {
    if (
      childrensPaymentInputData.label.trim() !== "" &&
      childrensPaymentInputData.details.trim() !== ""
    ) {
      console.log(childrensPaymentArray);
      setChildrensPaymentArray([
        ...childrensPaymentArray,
        childrensPaymentInputData,
      ]);
      setChildrensPaymentInputData({ label: "", details: "" });
    } else {
      // Notify user that the input fields should not be empty
      alert("Label and Value should not be empty");
    }
  };

  // Function to delete data
  const deleteChildrensPaymentData = (index) => {
    const updatedArray = childrensPaymentArray.filter((item, i) => i !== index);
    setChildrensPaymentArray(updatedArray);
  };
  // Children's Payment multiple input end

  //Accomodation Type multiple input start
  const [newRoom, setRooms] = useState({
    noOfBeds: "",
    bedTypeId: "",
    //bedType: "",
  });
  const addNewBedDetails = () => {
    if (newRoom.noOfBeds && newRoom.noOfBeds > 0 && newRoom.bedTypeId) {
      let list = pricingInputData.bedDetails;
      list.push(newRoom);
      setPricingInputData({
        ...pricingInputData,
        bedDetails: list,
      });
      setRooms({ noOfBeds: "", bedTypeId: "" });
      console.log(pricingInputData);
    } else {
      console.log(newRoom);
      alert("No bed data provided. Please enter valid bed details.");
    }
  };
  const deleteNewRoom = (ind) => {
    let list = pricingInputData.bedDetails;
    list.splice(ind, 1);
    setPricingInputData({
      ...pricingInputData,
      bedDetails: list,
    });

    console.log(pricingInputData);
  };
  const [pricingInputData, setPricingInputData] = useState({
    roomName: "",
    roomType: "",
    bedDetails: [],
    noOfRooms: "",
    noOfGuests: "",
  });

  const [pricingInputArr, setPricingInputArr] = useState([]);
  let { roomName, roomType, bedDetails, noOfRooms, noOfGuests } =
    pricingInputData;
  function addData() {
    // Check if any of the fields are empty
    if (
      !roomName ||
      !noOfRooms ||
      !noOfRooms.match(/^\d+$/) ||
      !noOfGuests ||
      !noOfGuests.match(/^\d+$/)
    ) {
      alert("All fields are required. Please enter valid details");
      return;
    }

    // Add data to the array
    setPricingInputArr([
      ...pricingInputArr,
      {
        roomName,
        roomType,
        noOfRooms,
        bedDetails,
        noOfGuests,
      },
    ]);

    // Reset input fields
    setPricingInputData({
      roomName: "",
      roomType: "",
      bedDetails: [],
      noOfRooms: "",
      noOfGuests: "",
    });
  }
  function pricingDeleteData(i) {
    console.log(i, "this index row wants to be deleted");
    let total1 = [...pricingInputArr];
    total1.splice(i, 1);
    setPricingInputArr(total1);
  }
  //Accomodation Type multiple input end

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

  //Bed Type start
  const [bedType, setBedType] = useState([]);
  const getBedType = async () => {
    try {
      const res = await BedTypeServices.getAllBedTypes();
      if (res.data?.length > 0) {
        setBedType(res.data);
      } else {
        setBedType([]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getBedType();
  }, []);
  //Bed Type end

  //Pricing multiple input start
  const [newPricingInputData, setNewPricingInputData] = useState({
    packageName: "",
    price: "",
    packageDetails: "",
    selectacc: "",
  });

  const [newPricingInputArr, setNewPricingInputArr] = useState([]);
  let { packageName, price, packageDetails, selectacc } = newPricingInputData;
  function addPricingData() {
    // Check if any of the fields are empty
    if (
      !packageName ||
      !price ||
      !price.match(/^\d+$/) ||
      !selectacc ||
      !packageDetails
    ) {
      alert("All fields are required. Please enter valid details");
      return;
    }

    // Add data to the array
    setNewPricingInputArr([
      ...newPricingInputArr,
      {
        packageName,
        price,
        packageDetails,
        selectacc,
      },
    ]);

    // Reset input fields
    setNewPricingInputData({
      packageName: "",
      price: "",
      packageDetails: "",
      selectacc: "",
    });
  }
  function newPricingDeleteData(i) {
    console.log(i, "this index row wants to be deleted");
    let total1 = [...newPricingInputArr];
    total1.splice(i, 1);
    setNewPricingInputArr(total1);
  }
  //Pricing multiple input end

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
    contactPersonEmail: "",
    googleMapLink: "",
    instagramLink: "",
    facebookLink: "",
    address: "",
    stayCategoriesDetails: [],
    accommodationTypesDetails: [],
    stayPricingDetails: [],
    stayAmenitiesDetails: [],
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
      includedMeals: "",
      extraStarters: "",
    },
    images: [""],
  });

  const [addError, setAddError] = useState({
    name: "",
    locationId: "",
    rating: "",
    priceStartsFrom: "",
    select: "",
    selectacc: "",
    about: "",
    accommodationType: "",
    accommodation: "",
    noOfRooms: "",
    noOfBeds: "",
    stayCategoriesDetails: "",
    accommodationTypesDetails: "",
    stayPricingDetails: "",
    stayAmenitiesDetails: "",
    childrenPaymentsDetails: "",
    contactPersonName: "",
    contactPersonNumber: "",
    contactPersonEmail: "",
    googleMapLink: "",
    address: "",
    checkInTime: "",
    checkOutTime: "",
    smoking: "",
    pets: "",
    coupleFriendly: "",
    includedMeals: "",
    extraStarters: "",
    images: "",
  });
  const validation = () => {
    let tempError = {
      name: "",
      locationId: "",
      rating: "",
      priceStartsFrom: "",
      select: "",
      selectacc: "",
      about: "",
      accommodationType: "",
      accommodation: "",
      noOfRooms: "",
      noOfBeds: "",
      stayCategoriesDetails: "",
      accommodationTypesDetails: "",
      stayPricingDetails: "",
      stayAmenitiesDetails: "",
      childrenPaymentsDetails: "",
      contactPersonName: "",
      contactPersonNumber: "",
      contactPersonEmail: "",
      googleMapLink: "",
      address: "",
      checkInTime: "",
      checkOutTime: "",
      smoking: "",
      pets: "",
      coupleFriendly: "",
      includedMeals: "",
      extraStarters: "",
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
    if (!stays.priceStartsFrom || !stays.priceStartsFrom.match(/^\d+$/)) {
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
    if (!stays.noOfRooms || !stays.noOfRooms.match(/^\d+$/)) {
      tempError.noOfRooms =
        "Number of rooms is required and should contain only numbers";
      valid = false;
    }
    if (!stays.noOfBeds || !stays.noOfBeds.match(/^\d+$/)) {
      tempError.noOfBeds =
        "Number of Beds is required and should contain only numbers";
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
    if (
      stays.contactPersonEmail &&
      !stays.contactPersonEmail.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )
    ) {
      tempError.contactPersonEmail = "Please provide valid email id";
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
    if (childrensPaymentArray.length === 0) {
      tempError.childrenPaymentsDetails = "Childern's Payment is required";
      valid = false;
    }
    if (pricingInputArr.length === 0) {
      tempError.accommodationTypesDetails = "Accomodation Type is required";
      valid = false;
    }
    if (newPricingInputArr.length === 0) {
      tempError.stayPricingDetails = "Price is required";
      valid = false;
    }
    if (!stays.stayHousePolicyDetails.checkInTime) {
      tempError.checkInTime = "Required Field";
      valid = false;
    }
    if (!stays.stayHousePolicyDetails.checkOutTime) {
      tempError.checkOutTime = "Required Field";
      valid = false;
    }
    if (!stays.stayHousePolicyDetails.smoking) {
      tempError.smoking = "Required Field";
      valid = false;
    }
    if (!stays.stayHousePolicyDetails.pets) {
      tempError.pets = "Required Field";
      valid = false;
    }
    if (!stays.stayHousePolicyDetails.coupleFriendly) {
      tempError.coupleFriendly = "Required Field";
      valid = false;
    }
    if (!stays.stayHousePolicyDetails.includedMeals) {
      tempError.includedMeals = "Required Field";
      valid = false;
    }
    if (!stays.stayHousePolicyDetails.extraStarters) {
      tempError.extraStarters = "Required Field";
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
    if (validation()) {
      addStays();
    }
  };
  const addStays = async () => {
    setLoading(true);
    console.log(stays);
    try {
      const res = await StaysService.addStays({
        ...stays,
        name: stays.name,
        locationId: Number(stays.locationId),
        rating: Number(stays.rating),
        about: stays.about,
        accommodationType: stays.accommodationType,
        accommodation: stays.accommodation,
        noOfRooms: stays.noOfRooms,
        noOfBeds: stays.noOfBeds,
        contactPersonName: stays.contactPersonName,
        contactPersonNumber: stays.contactPersonNumber,
        contactPersonEmail: stays.contactPersonEmail,
        googleMapLink: stays.googleMapLink,
        instagramLink: stays.instagramLink,
        facebookLink: stays.facebookLink,
        priceStartsFrom: stays.priceStartsFrom + " " + stays.select,
        stayCategoriesDetails: selectedOptions.map((x) => ({
          categoryId: x.id,
        })),
        accommodationTypesDetails: pricingInputArr.map((x) => ({
          roomName: x.roomName,
          //price: x.price + " " + x.selectacc,
          //includedPackages: x.packageIncludes,
          roomType: x.roomType,
          noOfRooms: x.noOfRooms,
          noOfGuests: x.noOfGuests,
          //noOfGuests: x.noOfGuests,
          bedDetails: x.bedDetails.map((x) => ({
            noOfBeds: Number(x.noOfBeds),
            bedTypeId: Number(x.bedTypeId),
          })),
        })),
        stayPricingDetails: newPricingInputArr.map((x) => ({
          packageName: x.packageName,
          price: x.price + " " + x.selectacc,
          packageDetails: x.packageDetails,
        })),
        stayAmenitiesDetails: amenitiesArray.map((x) => ({
          amenity: x.amenities,
        })),
        childrenPaymentsDetails: childrensPaymentArray.map((x) => ({
          label: x.label,
          details: x.details,
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
        images: images,
        // stayHousePolicyDetails: {
        //   checkInTime: "string",
        // },
        checkInTime: stays.stayHousePolicyDetails.checkInTime,
        checkOutTime: stays.stayHousePolicyDetails.checkOutTime,

        smoking: stays.stayHousePolicyDetails.smoking,
        pets: stays.stayHousePolicyDetails.pets,
        coupleFriendly: stays.stayHousePolicyDetails.coupleFriendly,
        includedMeals: stays.stayHousePolicyDetails.includedMeals,
        extraStarters: stays.stayHousePolicyDetails.extraStarters,

        //images: ["images"],
      });
      if (res.status === 200) {
        alert(res.message);
        navigate("/stays");
      } else {
        alert("Error while adding");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitStays();
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
                    required
                    type="text"
                    placeholder="Please enter Stay name"
                    className="text-capitalize"
                    value={stays.name}
                    onChange={(e) =>
                      setStays({ ...stays, name: Capitalize(e.target.value) })
                    }
                    isInvalid={!!addError.name}
                  />
                  <p className="required-field-meassage">{addError.name}</p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="location" label="Location*">
                  <Form.Select
                    required
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
                    required
                    type="text"
                    placeholder="Rating"
                    value={rating}
                    onChange={handleRatingChange}
                    isInvalid={!!error || !!addError.rating}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="required-field-meassage"
                  >
                    {error ? error : addError.rating}
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
                        checked={selectedOptions.includes(i)}
                        onChange={() => handleCheckboxChange(i)}
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
                    required
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
                    required
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
                    <option value="Per Person">Per Person</option>
                    <option value="Per Room">Per Room</option>
                  </Form.Select>
                  <p className="required-field-meassage">{addError.select}</p>
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
                    required
                    type="text"
                    placeholder="Accomodation Tyoe"
                    className="text-capitalize"
                    value={stays.accommodationType}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        accommodationType: Capitalize(e.target.value),
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
                    required
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
              Accomodation Type
              <p className="required-field-meassage">
                {addError.accommodationTypesDetails}
              </p>
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="roomName"
                  label="Room Name*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="text-capitalize"
                    value={pricingInputData.roomName}
                    onChange={(e) => {
                      setPricingInputData({
                        ...pricingInputData,
                        roomName: Capitalize(e.target.value),
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="roomType"
                  label="Room Type"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="text-capitalize"
                    value={pricingInputData.roomType}
                    onChange={(e) => {
                      setPricingInputData({
                        ...pricingInputData,
                        roomType: Capitalize(e.target.value),
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="noOfRooms"
                  label="Total no. of Rooms*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="No. of Rooms"
                    style={{ textTransform: "capitalize" }}
                    value={pricingInputData.noOfRooms}
                    onChange={(e) => {
                      setPricingInputData({
                        ...pricingInputData,
                        noOfRooms: e.target.value,
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="noOfGuests"
                  label="Total no. of Guests*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
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

              <Row>
                <Col>
                  <FloatingLabel controlId="Bed Type" label="Bed Type*">
                    <Form.Select
                      required
                      aria-label="Bed Type*"
                      value={newRoom.bedTypeId}
                      onChange={(e) => {
                        setRooms({
                          ...newRoom,
                          bedTypeId: Number(e.target.value),
                        });
                      }}
                    >
                      <option>Select</option>
                      {bedType.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.bedType}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col style={{ display: "flex" }}>
                  <FloatingLabel
                    controlId="noOfBeds"
                    label="Total no. of Beds*"
                    className="mb-3"
                    style={{ width: "27rem" }}
                  >
                    <Form.Control
                      type="number"
                      min={"0"}
                      placeholder="noOfBeds"
                      style={{ textTransform: "capitalize" }}
                      value={newRoom.noOfBeds}
                      onChange={(e) => {
                        setRooms({
                          ...newRoom,
                          noOfBeds: Number(e.target.value),
                        });
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
                      onClick={addNewBedDetails}
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
                      <th>Bed type</th>
                      <th>No. of Beds</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingInputData?.bedDetails?.map((item, index) => {
                      const bedTypeName =
                        bedType.find((type) => type.id === item.bedTypeId)
                          ?.bedType || "Unknown";

                      return (
                        <tr key={index}>
                          <td>{bedTypeName}</td>
                          <td>{item.noOfBeds}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteNewRoom(index)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>

              <Row>
                <Col>
                  <Button onClick={addData} className="custom-btn-reverse">
                    Add Accommodation Types
                  </Button>
                </Col>
              </Row>

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
                      <th>Room Name</th>
                      <th>Room Type</th>
                      <th>No. of Rooms</th>
                      <th>No Of Beds</th>
                      <th>Bed Type</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingInputArr.map((info, i) => {
                      return (
                        <tr key={i}>
                          <td>{info.roomName}</td>
                          <td>{info.roomType}</td>
                          <td>{info.noOfRooms}</td>
                          <td>
                            {info.bedDetails.map((x) => x.noOfBeds).join(",")}
                          </td>
                          <td>
                            {info.bedDetails
                              .map((x) => {
                                const bedTypeName =
                                  bedType.find(
                                    (type) => type.id === x.bedTypeId
                                  )?.bedType || "Unknown";
                                return bedTypeName;
                              })
                              .join(",")}
                          </td>
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
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              Pricing
              <p className="required-field-meassage">
                {addError.stayPricingDetails}
              </p>
            </h4>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="packageName"
                  label="Package Name*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="text-capitalize"
                    value={newPricingInputData.packageName}
                    onChange={(e) => {
                      setNewPricingInputData({
                        ...newPricingInputData,
                        packageName: Capitalize(e.target.value),
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="packageIncludes"
                  label="Package Includes*"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="text-capitalize"
                    value={newPricingInputData.packageDetails}
                    onChange={(e) => {
                      setNewPricingInputData({
                        ...newPricingInputData,
                        packageDetails: Capitalize(e.target.value),
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="price"
                    label="Price"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Price*"
                      style={{ textTransform: "capitalize" }}
                      value={newPricingInputData.price}
                      onChange={(e) => {
                        setNewPricingInputData({
                          ...newPricingInputData,
                          price: e.target.value,
                        });
                      }}
                    />
                  </FloatingLabel>
                </Col>{" "}
                <Col>
                  <FloatingLabel controlId="selectacc" label="Select*">
                    <Form.Select
                      aria-label="Select*"
                      value={newPricingInputData.selectacc}
                      onChange={(e) =>
                        setNewPricingInputData({
                          ...newPricingInputData,
                          selectacc: e.target.value,
                        })
                      }
                      //isInvalid={!!addError.selectacc}
                    >
                      <option>Select</option>
                      <option value="Per Person">Per Person</option>
                      <option value="Per Room">Per Room</option>
                    </Form.Select>
                    {/* <p className="required-field-meassage">
                    {addError.selectacc}
                  </p> */}
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    onClick={addPricingData}
                    className="custom-btn-reverse"
                  >
                    Add Price
                  </Button>
                </Col>
              </Row>
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
                      <th>Package Name</th>
                      <th>Package Details</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newPricingInputArr.map((info, i) => {
                      return (
                        <tr>
                          <td>{info.packageName}</td>
                          <td>{info.packageDetails}</td>
                          <td>{info.price + " " + info.selectacc}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => newPricingDeleteData(i)}
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
                      className="text-capitalize"
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
                    label="Activities"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Please enter Activities"
                      className="text-capitalize"
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
                    label="Facilities"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Please enter Facilities"
                      className="text-capitalize"
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
                    label="Near by Places"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Please enter Near By Places"
                      className="text-capitalize"
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
          </Container>
          <br />

          <Container className="add-stay-group-border">
            <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
              House Policy
            </h4>
            <Row>
              <h5>Check In/Out Time</h5>
              <Col>
                <FloatingLabel
                  controlId="checkInTime"
                  label="Check-In Time*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.checkInTime}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          checkInTime: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.checkInTime}
                  />
                  <p className="required-field-meassage">
                    {addError.checkInTime}
                  </p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="checkOutTime"
                  label="Check-Out Time*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.checkOutTime}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          checkOutTime: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.checkOutTime}
                  />
                  <p className="required-field-meassage">
                    {addError.checkOutTime}
                  </p>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="smoking"
                  label="Smoking*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.smoking}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          smoking: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.smoking}
                  />
                  <p className="required-field-meassage">{addError.smoking}</p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="pets" label="Pets*" className="mb-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.pets}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          pets: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.pets}
                  />
                  <p className="required-field-meassage">{addError.pets}</p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="coupleFriendly"
                  label="Couple Friendly*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.coupleFriendly}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          coupleFriendly: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.coupleFriendly}
                  />
                  <p className="required-field-meassage">
                    {addError.coupleFriendly}
                  </p>
                </FloatingLabel>
              </Col>
            </Row>
            {/* <Row>
              <h5>Children's Payment</h5>
              <Col>
                <FloatingLabel
                  controlId="childrenBelow5"
                  label="Children below 5 year*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.childrenBelow5}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          childrenBelow5: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.childrenBelow5}
                  />
                  <p className="required-field-meassage">
                    {addError.childrenBelow5}
                  </p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="children5To10"
                  label="Children aged 5-10 years*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.children5To10}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          children5To10: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.children5To10}
                  />
                  <p className="required-field-meassage">
                    {addError.children5To10}
                  </p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="childrenAbove10"
                  label="Children above 10 year*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.childrenAbove10}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          childrenAbove10: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.childrenAbove10}
                  />
                  <p className="required-field-meassage">
                    {addError.childrenAbove10}
                  </p>
                </FloatingLabel>
              </Col>
            </Row> */}
            <Row>
              <h5>Food Policy</h5>
              <Col>
                <FloatingLabel
                  controlId="includedMeals"
                  label="Included meals*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.includedMeals}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          includedMeals: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.includedMeals}
                  />
                  <p className="required-field-meassage">
                    {addError.includedMeals}
                  </p>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="extraStarters"
                  label="Extra Starters*"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please enter data"
                    value={stays.stayHousePolicyDetails.extraStarters}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        stayHousePolicyDetails: {
                          ...stays.stayHousePolicyDetails,
                          extraStarters: e.target.value,
                        },
                      })
                    }
                    isInvalid={!!addError.extraStarters}
                  />
                  <p className="required-field-meassage">
                    {addError.extraStarters}
                  </p>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <h5>Children's Payment</h5>
              <Col>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  <FloatingLabel
                    controlId="label"
                    label="Label*"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Please enter Label"
                      className="text-capitalize"
                      name="label"
                      value={childrensPaymentInputData.label}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="details"
                    label="Details*"
                    className="mb-3"
                    style={{ marginRight: "1rem" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Please enter Value"
                      className="text-capitalize"
                      name="details"
                      value={childrensPaymentInputData.details}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                  <Button
                    onClick={addChildrensPaymentInputData}
                    style={{ height: "40px" }}
                    className="custom-btn-reverse"
                  >
                    Add
                  </Button>
                </div>
                <Container className="cp-table-styling">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no.</th>
                        <th>Label</th>
                        <th>Details</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {childrensPaymentArray.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.label}</td>
                          <td>{item.details}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faX}
                              onClick={() => deleteChildrensPaymentData(index)}
                              style={{ cursor: "pointer" }}
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
                    required
                    type="text"
                    placeholder="Please enter contact name"
                    className="text-capitalize"
                    value={stays.contactPersonName}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        contactPersonName: Capitalize(e.target.value),
                      })
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
                    required
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
              <Col>
                <FloatingLabel
                  controlId="contactEmail"
                  label="Contact Email"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="email"
                    placeholder="Please enter contact email"
                    value={stays.contactPersonEmail}
                    onChange={(e) =>
                      setStays({
                        ...stays,
                        contactPersonEmail: e.target.value,
                      })
                    }
                    isInvalid={!!addError.contactPersonEmail}
                  />
                  <p className="required-field-meassage">
                    {addError.contactPersonEmail}
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
                    //isInvalid={!!addError.googleMapLink}
                  />
                  {/* <p className="required-field-meassage">
                    {addError.googleMapLink}
                  </p> */}
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
                    //isInvalid={!!addError.address}
                  />
                  {/* <p className="required-field-meassage">{addError.address}</p> */}
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
                      className="add-edit-image-size"
                      thumbnail
                      loading="lazy"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="image-trash-button add-image-trash-style"
                      onClick={() => handleRemoveImage(index)}
                    />
                    {/* <Button
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
                    </Button> */}
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
