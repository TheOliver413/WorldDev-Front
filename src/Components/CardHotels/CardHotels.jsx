import React from "react";
import CardHotel from "../CardHotel/CardHotel";
import Loader from "../Loader/Loader";
import './CardHotels.css'

const CardHotels = ({ actualHotels }) => {
  return (
    <div className="cardHotels-container">
      {actualHotels.length ? actualHotels.map((h) => (
        <CardHotel
          key={h.id}
          id={h.id}
          image={h.image}
          name={h.name}
          qualification={h.qualification}
          location={h.Locations.map((l) => `${l.city}, ${l.country}, ${l.continent}`).join(', ')}
        />
      )) : <Loader />}
    </div>
  );
};

export default CardHotels;
