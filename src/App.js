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
      </Routes>
    </div>
  );
}

export default App;
