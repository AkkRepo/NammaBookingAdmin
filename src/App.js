import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//pages
import BlogManager from './components/pages/BlogManager';
import Stays from "./components/pages/Stays";
import Dashboard from "./components/pages/Dashboard";
import AddStays from "./components/subcomponents/AddStays";
import EditStays from "./components/subcomponents/editStays/EditStays";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import Multiple from "./components/subcomponents/Multiple";
import Users from "./components/pages/Users";
import Categories from "./components/pages/Categories";
import Locations from "./components/pages/Locations";
import EditUsersCopy from "./components/subcomponents/EditUsersCopy";

import { AuthService } from "./services/Auth";
import TestingFile from "./components/subcomponents/TestingFile";
import StayDetails from "./components/subcomponents/StayDetails";
import CategoriesDetails from "./components/subcomponents/CategoriesDetails";
import LocationDetails from "./components/subcomponents/LocationDetails";
import BedType from "./components/pages/BedType";
import Testimonies from "./components/pages/Testimonies";
import TestimoniesDetails from "./components/subcomponents/TestimoniesDetails";
import AddLocations from "./components/subcomponents/AddLocations";
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
        <Route path="/blogs" element={<BlogManager />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/testimonies" element={<Testimonies />} />
        <Route path="/stays/addStays" element={<AddStays />} />
        <Route path="/stays/stayDetails/:id" element={<StayDetails />} />
        <Route path="/stays/editStays/:id" element={<EditStays />} />
        <Route
          path="/stays/categoryDetails/:id"
          element={<CategoriesDetails />}
        />
        <Route
          path="/stays/locationDetails/:id"
          element={<LocationDetails />}
        />
        <Route
          path="/testimoniesDetails/:id"
          element={<TestimoniesDetails />}
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/users" element={<Users />} />
        <Route path="/bedType" element={<BedType />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/dashboard/editStays" element={<EditStays />} />
          <Route path="/dashboard/Multiple" element={<Multiple />} />
          <Route path="/dashboard/EditUsersCopy" element={<EditUsersCopy />} />
          <Route path="/dashboard/TestingFile" element={<TestingFile />} />
          <Route path="/dashboard/addLocations" element={<AddLocations />} />
          {/* <Route path="/dashboard/addLocation" element={<AddMoreInfo />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
