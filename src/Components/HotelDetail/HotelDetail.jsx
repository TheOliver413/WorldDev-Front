import { Button } from "bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetail, getDetailHotel } from "../../redux/action/action.js";
// import ServicesHotel from "../ServicesHotel/ServicesHotel.jsx";
import CardRoom from "../CardRoom/CardRoom.jsx";
import Footer from "../Footer/Footer.jsx";
// import Nav from "../Nav/Nav.jsx";
import './HotelDetail.css'

const HotelDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  //component did mount/update
  useEffect(() => {
    dispatch(getDetailHotel(id));
  }, [dispatch, id]);

  //component will unmount
  useEffect(() => {
    return () => dispatch(clearDetail())
  }, [dispatch])

  const hotelDetail = useSelector((state) => state.reducerHotel.detailHotel);
  const { name, image, qualification, description, Locations, Rooms } = hotelDetail
  return (
    <div className="hotelDetail-container">
      {/* <Nav /> */}
      {hotelDetail.name ? (
        <div>
          <img className="hotelDetail-img" src={image} alt={name} />
          <div className="hotelDetail-body">
            <h1 className="hotelDetail-title">{name}</h1>
            <p>{Locations[0].city}, {Locations[0].country}</p>
            <p>Score: {qualification}</p>
            <p>{description}</p>
            <Link to="/home">
              <button>Back</button>
            </Link>
          </div>
          <h2>Available rooms</h2>
          <div>
            <label>Check-in&nbsp;</label>
            <input type={"date"} />
          </div>
          <label>Check-out&nbsp;</label>
          <input type={"date"} />
          {Rooms.map((r) => (
            <CardRoom id={r.id} name={r.name} image={r.image} price={r.price} description={r.description} />
          ))}

          {/* <h2>What this place offers</h2>
          <ServicesHotel /> */}
        </div>
      ) : (
        <h3>Loading detail</h3>
      )}
    </div>
  );
};

export default HotelDetail;