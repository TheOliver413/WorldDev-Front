import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home.jsx";
import Create from "./Components/Create/Create";
import Loging from "../src/Components/Loging/Loging";
import Nav from "./Components/Nav/Nav"
import HotelDetail from './Components/HotelDetail/HotelDetail.jsx'
import Footer from './Components/Footer/Footer'
import CreateRooms from "./Components/CreateRooms/CreateRooms";
import CreateHotel from "./Components/CreateHotel/Create";
import CreateEvents from "./Components/CreateEvents/CreateEvents";
import RoomDetail from "./Components/RoomDetail/RoomDetail";
import Favorite from "./Components/Favorite/Favorite";
import CreateServRooms from "./Components/CreateServRooms/CreateServRooms";
import CreateServHotels from "./Components/CreateServHotels/CreateServHotels";
import ModifyServHotels from "./Components/CreateServHotels/ModifiyServHotels";
import ModifyHotel from "./Components/CreateHotel/ModifyHotel";
import ModifyRooms from "./Components/CreateRooms/ModifyRooms";




function App() {
  return (
    <div>
        <Nav />
        <Routes>

          <Route exact path="/home/ModifyHotel" element={< ModifyHotel />}/>
          <Route exact path="/home/ModifyRooms" element={<ModifyRooms/>}/>
          <Route exact path="/home/createServRooms" element={<CreateServRooms/>}/>
          <Route exact path="/home/createServHotels" element={<CreateServHotels/>}/>
          <Route exact path="/home/modifyServHotels" element={<ModifyServHotels/>}/>
          <Route exact path="/home/createEvents" element={<CreateEvents/>}/>
          <Route exact path="/home/createRooms" element={<CreateRooms/>}/>
          <Route exact path="/home/createHotels" element={<CreateHotel/>}/>
          <Route exact path="/home/dashboard" element={<Create/>}/>
          <Route exact path="/home/loging" element={<Loging/>}/>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path='/hotel/room/:id' element={<RoomDetail/>} />
          <Route path='/hotel/:id' element={<HotelDetail/>} />
          <Route path='/favorite' element={<Favorite/>} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;