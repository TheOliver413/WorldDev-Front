import React, { useEffect } from "react";
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
              <div className="carousel-item active" data-bs-interval="3000">
                <img src={ image[0] } className="hotelDetail-img" alt={name} />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src= { image[1] } className="hotelDetail-img" alt={name}></img>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
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
            <h6>{Locations[0]?.city}, {Locations[0]?.department}, {Locations[0]?.state}</h6>
            <p>Score: {qualification} ✫</p>
            <p>{description}</p>
            <h2 className="mt-5">Available rooms</h2>
            <small>Note: the prices shown below are for one night. For more information, please read the room detail.</small>
            {Rooms.map((r) => (
              <CardRoom key={r.id} id={r.id} name={r.name} image={r.image} price={(r.price)} description={r.description} />
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