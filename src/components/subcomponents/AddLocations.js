import React, { useState } from "react";
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
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import { LocationsService } from "../../services/Locations";
import { useNavigate } from "react-router-dom";
import { LoadingModal } from "../pages/Others/Index";
import { Capitalize } from "../../core/utils";

function AddLocations(props) {
  const navigate = useNavigate();
  const [fullscreen, setFullscreen] = useState(true);
  const [loading, setLoading] = useState(false);

  // More Info multiple input start
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedOption, setSelectedOption] = useState("ExcelSheet");

  const [moreInfoArray, setMoreInfoArray] = useState([]);
  const [moreInfoInputData, setMoreInfoInputData] = useState({
    label: "",
    details: "",
  });

  // Function to handle input change
  const moreInfoHandleInputChange = (e) => {
    const { name, value } = e.target;
    setMoreInfoInputData({
      ...moreInfoInputData,
      [name]: name === "amenities" ? Capitalize(value) : value,
    });
  };

  // Function to add input data
  const addMoreInfoInputData = () => {
    if (
      moreInfoInputData.label.trim() !== "" &&
      moreInfoInputData.details.trim() !== ""
    ) {
      setMoreInfoArray([...moreInfoArray, moreInfoInputData]);
      setMoreInfoInputData({ label: "", details: "" });
    } else {
      alert("Label and Value should not be empty");
    }
  };

  // Function to delete data
  const deleteMoreInfoData = (index) => {
    const updatedArray = moreInfoArray.filter((item, i) => i !== index);
    setMoreInfoArray(updatedArray);
  };

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        const sheetName = workbook.SheetNames[0]; // Get the first sheet name
        const sheet = workbook.Sheets[sheetName]; // Get the first sheet
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert sheet to array of arrays

        const dataWithoutHeaders = data.slice(1); // Omit the first row (headers)

        // Validate the number of columns in the data
        if (data[0].length !== 2) {
          alert("The uploaded Excel sheet must contain exactly 2 columns.");
          return;
        }

        // Map data to moreInfoArray format
        const formattedData = dataWithoutHeaders.map((row) => ({
          label: row[0] ? row[0] : "", // Default to empty string if no value
          details: row[1] ? row[1] : "",
        }));

        setTableData(dataWithoutHeaders); // Set table data for display
        setMoreInfoArray([...moreInfoArray, ...formattedData]); // Update moreInfoArray
      };

      reader.readAsBinaryString(file);
    }
  };

  //More Info end

  const [locations, setLocations] = useState({
    location: "",
    imageUrl: "",
    readMoreDetails: [],
  });
  const [error, setError] = useState({
    location: "",
    imageUrl: "",
  });

  const validation = () => {
    let tempError = {
      location: "",
      imageUrl: "",
    };
    let valid = true;
    if (!locations.location || !locations.location.match(/^[a-zA-Z'" ]*$/)) {
      tempError.location =
        "Location is required and should contain only letters and inverted commas";
      valid = false;
    }
    if (!locations.imageUrl) {
      tempError.imageUrl = "Image is required or invalid size";
      valid = false;
    }
    if (moreInfoArray.length === 0) {
      tempError.readMoreDetails = "Field is required";
      valid = false;
    }
    setError(tempError);
    return valid;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 300 * 1024) {
      // Convert KB to bytes
      alert("File size exceeds 300KB limit. Please select a smaller file.");
      e.target.files = null;
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocations({
          ...locations,
          imageUrl: reader.result.split(",")[1],
          readMoreDetails: moreInfoArray.map((x) => ({
            label: x.label,
            details: x.details,
          })),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitLocations = () => {
    if (validation()) {
      addLocation();
    }
  };

  const addLocation = async () => {
    setLoading(true);
    try {
      const res = await LocationsService.addLocations({
        ...locations,
        readMoreDetails: moreInfoArray.map((x) => ({
          label: x.label,
          details: x.details,
        })),
      });
      if (res.status === 200) {
        alert(res.message);
        setLocations({ location: "", imageUrl: "", readMoreDetails: [] }); // Clear the form
        props.onHide();
        props.onClose();
        navigate("/locations");
      } else {
        alert("Error while adding");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen={fullscreen}
        style={{ backgroundColor: "white" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Location
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <FloatingLabel
                controlId="addLocation"
                label="Add Location"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Add Location"
                  value={locations.location}
                  onChange={(e) =>
                    setLocations({ ...locations, location: e.target.value })
                  }
                  isInvalid={!!error.location}
                />
              </FloatingLabel>
              {error.location && (
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "-10px",
                    color: "red",
                  }}
                >
                  {error.location}
                </p>
              )}
              <FloatingLabel
                controlId="locationsImage"
                label="Add Image"
                className="mb-3"
              >
                <Form.Control
                  type="file"
                  placeholder="Add Image"
                  multiple={false}
                  onChange={handleImageChange}
                  isInvalid={!!error.imageUrl}
                />
              </FloatingLabel>
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "-10px",
                  color: "#e77225",
                }}
              >
                (Maximum one image is allowed)
              </p>
            </Col>
            <Col>
              <div style={{ marginLeft: "2rem" }}>
                {locations.imageUrl && (
                  <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <Image
                      rounded
                      src={`data:image/jpeg;base64,${locations.imageUrl}`}
                      alt="Uploaded"
                      style={{ width: "20rem", height: "12rem" }}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </Col>
            <Container>
              <Row>
                <h4 style={{ paddingBottom: "15px", color: "#051e3c" }}>
                  More Information
                </h4>

                <div style={{ marginBottom: "15px", display: "flex" }}>
                  <Form.Check
                    type="radio"
                    label="Add details through Excel sheet"
                    name="options"
                    value="ExcelSheet"
                    checked={selectedOption === "ExcelSheet"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Add details through Form"
                    name="options"
                    value="FormSheet"
                    checked={selectedOption === "FormSheet"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                </div>

                {selectedOption === "ExcelSheet" && (
                  <>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <h6>Please refer Sample Excel Sheet:</h6>
                      <a
                        href="../../img/RefSheet/RefSheet.xlsx"
                        download="RefSheet.xlsx"
                        style={{
                          textDecoration: "none",
                          color: "blue",
                          cursor: "pointer",
                        }}
                      >
                        Download PDF
                      </a>
                    </div>
                    <FloatingLabel
                      controlId="uploadFile"
                      label="Upload File*"
                      className="mb-3"
                    >
                      <Form.Control
                        type="file"
                        accept=".xls,.xlsx"
                        onChange={handleFileUpload}
                      />
                    </FloatingLabel>
                  </>
                )}

                {tableData.length > 0 && selectedOption === "ExcelSheet" && (
                  <table
                    border="1"
                    style={{ borderCollapse: "collapse", marginTop: "20px" }}
                  >
                    <thead>
                      <tr>
                        {headers.map((header, index) => (
                          <th
                            key={index}
                            style={{
                              padding: "8px",
                              backgroundColor: "#f2f2f2",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              style={{ padding: "8px", textAlign: "left" }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {selectedOption === "FormSheet" && (
                  <>
                    <Row>
                      <Col>
                        <div style={{ marginBottom: "1rem" }}>
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
                              value={moreInfoInputData.label}
                              onChange={moreInfoHandleInputChange}
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
                              value={moreInfoInputData.details}
                              onChange={moreInfoHandleInputChange}
                            />
                          </FloatingLabel>
                          <Button
                            onClick={addMoreInfoInputData}
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
                              {moreInfoArray.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.label}</td>
                                  <td>{item.details}</td>
                                  <td>
                                    <FontAwesomeIcon
                                      icon={faX}
                                      onClick={() => deleteMoreInfoData(index)}
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
                  </>
                )}
              </Row>
            </Container>
          </Row>
        </div>
        <hr style={{ color: "grey" }} />
        <Row style={{ paddingBottom: "1rem" }}>
          <Col style={{ paddingLeft: "2rem" }}>
            <Button onClick={submitLocations} className="custom-btn">
              Add
            </Button>
          </Col>
          <Col style={{ paddingRight: "2rem", marginLeft: "-1rem" }}>
            <Button onClick={props.onHide} className="custom-btn">
              Cancel
            </Button>
          </Col>
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
        </Row>
      </Modal>
      <LoadingModal show={loading} />
    </>
  );
}

export default AddLocations;
