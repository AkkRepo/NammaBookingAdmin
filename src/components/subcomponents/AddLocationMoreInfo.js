import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FloatingLabel,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx"; // Import library to handle Excel files
import { LoadingModal } from "../pages/Others/Index";
import { LocationsService } from "../../services/Locations";

function AddLocationMoreInfo(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("Form"); // State to toggle between "Form" and "ExcelSheet"

  const [newMoreInfoData, setNewMoreInfoData] = useState({
    label: "",
    details: "",
  });
  const [addError, setAddError] = useState({
    label: "",
    details: "",
  });

  // State for Excel data
  const [excelData, setExcelData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validation = () => {
    let tempError = {
      label: "",
      details: "",
    };
    let valid = true;
    if (!newMoreInfoData.label) {
      tempError.label = "Required field";
      valid = false;
    }
    if (!newMoreInfoData.details) {
      tempError.details = "Required field";
      valid = false;
    }
    setAddError(tempError);
    return valid;
  };

  const addAddMoreInfoData = async () => {
    if (validation()) {
      setLoading(true);
      try {
        const res = await LocationsService.addAddMoreInfoData({
          locationId: props.id,
          readMoreDetails: [
            {
              label: newMoreInfoData.label,
              details: newMoreInfoData.details,
            },
          ],
        });
        if (res.status === 200) {
          setNewMoreInfoData({
            label: "",
            details: "",
          });
          alert(res.message);
          props.onUpdateStay();
          handleClose();
        } else {
          alert("All fields are required");
        }
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    }
  };

  const addExcelData = async () => {
    if (excelData.length > 0) {
      setLoading(true);
      try {
        const formattedData = excelData.map((row) => ({
          label: row[Object.keys(row)[0]],
          details: row[Object.keys(row)[1]],
        }));
        const res = await LocationsService.addAddMoreInfoData({
          locationId: props.id,
          readMoreDetails: formattedData,
        });
        if (res.status === 200) {
          alert("Excel data added successfully");
          props.onUpdateStay();
          handleClose();
        } else {
          alert("Failed to add data from Excel");
        }
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    } else {
      alert("No data to add from Excel");
    }
  };

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);

        // Validate the number of columns in the data
        if (json.length > 0 && Object.keys(json[0]).length !== 2) {
          alert("The uploaded Excel sheet must contain exactly 2 columns.");
          setExcelData([]); // Reset Excel data if validation fails
          return;
        }

        setExcelData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleViewModeChange = (newMode) => {
    if (viewMode !== newMode) {
      if (
        excelData.length > 0 ||
        newMoreInfoData.label ||
        newMoreInfoData.details
      ) {
        const confirmSwitch = window.confirm(
          "Switching modes will clear the current data. Do you want to continue?"
        );
        if (!confirmSwitch) {
          return; // Prevent mode switch if user cancels
        }
      }

      // Clear data and switch mode
      setViewMode(newMode);
      setNewMoreInfoData({ label: "", details: "" });
      setExcelData([]);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add More Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <h6>Please refer Sample Excel Sheet:</h6>
            <a
              href="https://docs.google.com/spreadsheets/d/1C16sPzYuq48cEpYniOIzduyvfm4O2XLr/edit?gid=1317533996#gid=1317533996"
              target="_blank"
            >
              <p className="sample-pdf">Sample PDF</p>
            </a>
          </div>
          <Form>
            <Form.Check
              type="radio"
              label="Add details through Excel sheet"
              name="viewMode"
              value="ExcelSheet"
              checked={viewMode === "ExcelSheet"}
              onChange={() => handleViewModeChange("ExcelSheet")}
            />
            <Form.Check
              type="radio"
              label="Add details through Form"
              name="viewMode"
              value="Form"
              checked={viewMode === "Form"}
              onChange={() => handleViewModeChange("Form")}
            />
            <br />
          </Form>
          {viewMode === "Form" && (
            <>
              <FloatingLabel controlId="Label" label="Label*" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Label"
                  className="text-capitalize"
                  value={newMoreInfoData.label}
                  onChange={(e) =>
                    setNewMoreInfoData({
                      ...newMoreInfoData,
                      label: e.target.value,
                    })
                  }
                  isInvalid={!!addError.label}
                />
                <p className="required-field-message">{addError.label}</p>
              </FloatingLabel>
              <FloatingLabel
                controlId="details"
                label="Details*"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  placeholder="Details"
                  className="text-capitalize"
                  value={newMoreInfoData.details}
                  onChange={(e) =>
                    setNewMoreInfoData({
                      ...newMoreInfoData,
                      details: e.target.value,
                    })
                  }
                  isInvalid={!!addError.details}
                />
                <p className="required-field-message">{addError.details}</p>
              </FloatingLabel>
            </>
          )}
          {viewMode === "ExcelSheet" && (
            <>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Excel File</Form.Label>
                <Form.Control type="file" onChange={handleExcelUpload} />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {excelData.length > 0 && (
            <Button className="custom-btn" onClick={addExcelData}>
              ExcelAdd
            </Button>
          )}
          {viewMode === "Form" && (
            <Button className="custom-btn" onClick={addAddMoreInfoData}>
              Add
            </Button>
          )}
          <Button className="custom-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <FontAwesomeIcon
        icon={faPlus}
        onClick={handleShow}
        size="lg"
        className="stay-edit-button"
        style={{ padding: "10px", borderRadius: "4rem" }}
      />
      <LoadingModal show={loading} />
    </div>
  );
}

export default AddLocationMoreInfo;
