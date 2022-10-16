import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetail, getDetailHotel } from "../../redux/action/action.js";
// import ServicesHotel from "../ServicesHotel/ServicesHotel.jsx";
import CardRoom from "../CardRoom/CardRoom.jsx";
import './HotelDetail.css'

const HotelDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const hotelDetail = useSelector((state) => state.reducerHotel.detailHotel);
  const { name, image, qualification, description, Locations, Rooms } = hotelDetail

  //component did mount/update
  useEffect(() => {
    dispatch(getDetailHotel(id));
  }, [dispatch, id]);

  //component will unmount
  useEffect(() => {
    return () => dispatch(clearDetail())
  }, [dispatch])

  //manejo del date input
  function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy.toISOString().split('T')[0]
  }
  
  function restDays(checkInInput, checkOutInput) {
    const inDate = new Date(checkInInput); 
    const outDate = new Date(checkOutInput);
    const difference = Math.abs(outDate - inDate);
    const days = difference/(1000 * 3600 * 24)
    return days
  }

  const [checkInInput, setCheckInInput] = useState(new Date().toISOString().split('T')[0])
  const [checkOutInput, setCheckOutInput] = useState(addDays(new Date(), 1))

  const handleCheckInChange = (e) => setCheckInInput(e.target.value)
  const handleCheckOutChange = (e) => setCheckOutInput(e.target.value)

  return (
    <div className="hotelDetail-container">
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
            <h2>Available rooms</h2>
            <div className="hotelDetail-input-container d-inline-flex flex-column">
              <label>Check-in</label>
              <input
                type="date"
                value={checkInInput}
                min={checkInInput}
                onChange={handleCheckInChange}
               />
              <label>Check-out</label>
              <input
                type="date"
                value={checkOutInput}
                min={addDays(new Date(), 1)}
                onChange={handleCheckOutChange}
               />
            </div>
            {Rooms.map((r) => (
              <CardRoom key={r.id} id={r.id} name={r.name} image={r.image} price={(r.price)*restDays(checkInInput, checkOutInput)} description={r.description} />
            ))}

            {/* <h2>What this place offers</h2> */}
            {/* <ServicesHotel /> */}
          </div>
        </div>
      ) : (
        <h3 className="hotelDetail-loading">Loading detail...</h3>
      )}
    </div>
  );
};

export default HotelDetail;