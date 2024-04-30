import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//pages
import Stays from "./components/pages/Stays";
import Dashboard from "./components/pages/Dashboard";
import AppNav from "./components/header/AppNav";
import AddStays from "./components/subcomponents/AddStays";
import EditStays from "./components/subcomponents/EditStays";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import Multiple from "./components/subcomponents/Multiple";
import MDTable from "./components/pages/MDTable";
import MultipleInputField from "./components/subcomponents/MultipleInputField";
import Amenities from "./components/pages/Amenities";
import AddAmenities from "./components/subcomponents/AddAmenities";
import EditAmenities from "./components/subcomponents/EditAmenities";
import DeleteAmenities from "./components/subcomponents/DeleteAmenities";
import Activities from "./components/pages/Activities";
import AddActivities from "./components/subcomponents/AddActivities";
import EditActivities from "./components/subcomponents/EditActivities";
import DeleteActivities from "./components/subcomponents/DeleteActivities";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Stays" element={<Stays />} />
        <Route path="/AddStays" element={<AddStays />} />
        <Route path="/EditStays" element={<EditStays />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Multiple" element={<Multiple />} />
        <Route path="/MDTable" element={<MDTable />} />
        <Route path="/MultipleInputField" element={<MultipleInputField />} />
        <Route path="/Amenities" element={<Amenities />} />
        <Route path="/AddAmenities" element={<AddAmenities />} />
        <Route path="/EditAmenities" element={<EditAmenities />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/AddActivities" element={<AddActivities />} />
        <Route path="/EditActivities" element={<EditActivities />} />
        <Route path="/DeleteAmenities" element={<DeleteAmenities />} />
        <Route path="/DeleteActivities" element={<DeleteActivities />} />
      </Routes>
    </div>
  );
}

export default App;
