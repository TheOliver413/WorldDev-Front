import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetail, getDetailHotel } from "../../redux/action/action.js";
// import ServicesHotel from "../ServicesHotel/ServicesHotel.jsx";
import CardRoom from "../CardRoom/CardRoom.jsx";
import { addDays, format, differenceInDays } from 'date-fns'
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
  const [checkInInput, setCheckInInput] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [checkOutInput, setCheckOutInput] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'))
  const handleCheckInChange = (e) => setCheckInInput(e.target.value)
  const handleCheckOutChange = (e) => setCheckOutInput(e.target.value)

  return (
    <div className="text-start">
      {hotelDetail.name ? (
        <>
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
            <h6>{Locations[0].city}, {Locations[0].department}, {Locations[0].state}</h6>
            <p>Score: {qualification} ✫</p>
            <p>{description}</p>
            <h2 className="mt-5">Available rooms</h2>
            <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
              <div className="d-flex flex-column align-items-start">
                <label>Check-in</label>
                <input
                  type="date"
                  value={checkInInput}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  onChange={handleCheckInChange}
                />
              </div>
              <div className="d-flex flex-column align-items-start">
                <label>Check-out</label>
                <input
                  type="date"
                  value={checkOutInput}
                  min={format(addDays(new Date(checkInInput || null), 2), 'yyyy-MM-dd')}
                  onChange={handleCheckOutChange}
                />
              </div>
            </div>
            {Rooms.map((r) => (
              <CardRoom key={r.id} id={r.id} name={r.name} image={r.image} price={(r.price)*differenceInDays(new Date(checkOutInput), new Date(checkInInput))} description={r.description} />
            ))}

            {/* <h2>What this place offers</h2> */}
            {/* <ServicesHotel /> */}
            <div className="d-grid gap-2 d-sm-block">
              <Link to="/home">
                <button className="btn btn-primary mt-4">Back</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <h3 className="hotelDetail-loading">Loading detail...</h3>
      )}
    </div>
  );
};

export default HotelDetail;