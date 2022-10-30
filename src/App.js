import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux'
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home.jsx";
import Create from "./Components/Create/Create";
import Nav from "./Components/Nav/Nav"
import HotelDetail from './Components/HotelDetail/HotelDetail.jsx'
import Footer from './Components/Footer/Footer'
import CreateRooms from "./Components/CreateRooms/CreateRooms";
import CreateHotel from "./Components/CreateHotel/CreateHotel";
import CreateEvents from "./Components/CreateEvents/CreateEvents";
import RoomDetail from "./Components/RoomDetail/RoomDetail";
import Favorite from "./Components/Favorite/Favorite";
import CreateServRooms from "./Components/CreateServRooms/CreateServRooms";
import CreateServHotels from "./Components/CreateServHotels/CreateServHotels";
import ModifyServHotels from "./Components/CreateServHotels/ModifiyServHotels";
import ModifyHotel from "./Components/CreateHotel/ModifyHotel";
import ModifyRooms from "./Components/CreateRooms/ModifyRooms";
import ModifyServRooms from "./Components/CreateServRooms/ModifyServiceRooms";
import ModifyEvents from "./Components/CreateEvents/ModifyEvents";
import Stripe from "./Components/Stripe/Stripe";
import Cart from "./Components/Cart/Cart";
import { getTotals } from "./redux/action/cartAction";

import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute/ProtectedRoute";
import Login from "./Components/Authentication/Login/Login";
import Register from "./Components/Authentication/Register/Register";
import ProfileUsers from "./Components/Authentication/ProfileUsers/ProfileUsers";
import EditUser from "./Components/Authentication/EditUser/EditUser"
import Events from "./Components/Events/Events";
import UserTable from "./Components/Admin/UserTable/UserTable";
import AdminTable from "./Components/Admin/AdminTable/AdminTable";
import AdminRegister from "./Components/Admin/AdminRegister/AdminRegister";
import AdminData from "./Components/Admin/AdminData/AdminData";

import AboutUs from "./Components/AboutUs/About"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTotals())
  }, [dispatch])
  return (
    <div>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route exact path="/home/Events" element={< Events />} />
          <Route exact path="/home/ModifyHotel" element={< ModifyHotel />} />
          <Route exact path="/home/ModifyRooms" element={<ModifyRooms />} />
          <Route exact path="/home/createServRooms" element={<CreateServRooms />} />
          <Route exact path="/home/modifyServRooms" element={<ModifyServRooms />} />
          <Route exact path="/home/createServHotels" element={<CreateServHotels />} />
          <Route exact path="/home/modifyServHotels" element={<ModifyServHotels />} />
          <Route exact path="/home/createEvents" element={<CreateEvents />} />
          <Route exact path="/home/modifyEvents" element={<ModifyEvents />} />
          <Route exact path="/home/createRooms" element={<CreateRooms />} />
          <Route exact path="/home/createHotels" element={<CreateHotel />} />
          <Route exact path="/home/dashboard" element={<Create />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path='/hotel/room/:id' element={<RoomDetail />} />
          <Route path='/hotel/:id' element={<HotelDetail />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/home/stripe' element={<Stripe />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/profileusers" element={<ProfileUsers />} />
          <Route path="/profileusers/EditUser" element={<EditUser/>}/>
          <Route exact path="/admin/admintable" element={<AdminTable />} />
          <Route exact path="/admin/adminregister" element={<AdminRegister />} />
          <Route exact path="/admin/admindata" element={<AdminData />} />
          <Route exact path="/admin/usertable" element={<UserTable />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;