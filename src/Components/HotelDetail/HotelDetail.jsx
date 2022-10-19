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
    <div className="hotelDetail-container text-start">
      {hotelDetail.name ? (
        <div>

          <div id="carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={ image[0] } className="hotelDetail-img" alt={name} />
                {/* <image src={image} className="d-block " alt={name}></image> */}
              </div>
              <div className="carousel-item">
                <img src= { image[1] } className="hotelDetail-img" alt={name}></img>
              </div>
              <div className="carousel-item">
                <img src= { image[2] } className="hotelDetail-img"  alt={name}></img>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="hotelDetail-body">
            <h1 className="hotelDetail-title">{name}</h1>
            <h6>{Locations[0].city}, {Locations[0].country}</h6>
            <p>Score: {qualification} ✫</p>
            <p>{description}</p>
            <h2 className="mt-5">Available rooms</h2>
            <div className="hotelDetail-input-container d-flex flex-column flex-sm-row gap-3 mt-3">
              <div className="d-flex flex-column align-items-start">
                <label>Check-in</label>
                <input
                  type="date"
                  value={checkInInput}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleCheckInChange}
                />
              </div>
              <div className="d-flex flex-column align-items-start">
                <label className="">Check-out</label>
                <input
                  type="date"
                  value={checkOutInput}
                  min={addDays(new Date(checkInInput), 1)}
                  onChange={handleCheckOutChange}
                />
              </div>
            </div>
            {Rooms.map((r) => (
              <CardRoom key={r.id} id={r.id} name={r.name} image={r.image} price={(r.price)*restDays(checkInInput, checkOutInput)} description={r.description} />
            ))}

            {/* <h2>What this place offers</h2> */}
            {/* <ServicesHotel /> */}
            <div className="d-grid gap-2 d-sm-block">
              <Link to="/home">
                <button className="btn btn-primary mt-4">Back</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="hotelDetail-loading">Loading detail...</h3>
      )}
    </div>
  );
};

export default HotelDetail;