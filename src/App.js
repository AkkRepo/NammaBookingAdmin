import { Routes, Route, Outlet, Navigate } from "react-router-dom";
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
import MultipleInputField from "./components/subcomponents/MultipleInputField";
import Amenities from "./components/pages/Amenities";
import Activities from "./components/pages/Activities";
import Users from "./components/pages/Users";
import Categories from "./components/pages/Categories";
import Locations from "./components/pages/Locations";
import EditUsersCopy from "./components/subcomponents/EditUsersCopy";

import { AuthService } from "./services/Auth";
import TestingFile from "./components/subcomponents/TestingFile";
const DashboardLayout = () => {
  if (AuthService.isLoggedin()) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
};
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/dashboard/stays" element={<Stays />} />
          <Route path="/dashboard/addStays" element={<AddStays />} />
          <Route path="/dashboard/editStays" element={<EditStays />} />
          <Route path="/dashboard/Multiple" element={<Multiple />} />
          <Route
            path="/dashboard/MultipleInputField"
            element={<MultipleInputField />}
          />
          <Route path="/dashboard/amenities" element={<Amenities />} />
          <Route path="/dashboard/activities" element={<Activities />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/categories" element={<Categories />} />
          <Route path="/dashboard/locations" element={<Locations />} />
          <Route path="/dashboard/EditUsersCopy" element={<EditUsersCopy />} />
          <Route path="/dashboard/TestingFile" element={<TestingFile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
