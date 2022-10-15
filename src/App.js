import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home.jsx";
import Create from "./Components/Create/Create";
import Loging from "../src/Components/Loging/Loging";
import Nav from "./Components/Nav/Nav"
import HotelDetail from './Components/HotelDetail/HotelDetail.jsx'
import Footer from './Components/Footer/Footer'
import CreateRooms from "./Components/CreateRooms/CreateRooms";
import CreateEvents from "./Components/CreateEvents/CreateEvents";
import RoomDetail from "./Components/RoomDetail/RoomDetail";
import Favorite from "./Components/Favorite/Favorite";

function App() {
  return (
    <div>
      <Nav/>
      <Switch>
        <Route exact path="/home/createEvents" component={ CreateEvents }></Route>
        <Route exact path="/home/createRooms" component={ CreateRooms }></Route>
        <Route exact path="/home/dashboard" component={ Create }></Route>
        <Route exact path="/home/loging" component={ Loging }></Route>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/home" component={Home} />
        <Route path='/hotel/room/:id' component={RoomDetail}/>
        <Route path='/hotel/:id' component={HotelDetail} />
        <Route path='/favorite' component={Favorite} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;


// import "./App.css";
// import { Route, Switch } from "react-router-dom";
// import LandingPage from "./Components/LandingPage/LandingPage";
// import Home from "./Components/Home/Home.jsx";

// function App() {
//   return (
//     <Switch>
//       <Route exact path="/" component={LandingPage}></Route>
//       <Route path="/home" component={Home} />
//     </Switch>
//   );
// }

// export default App;