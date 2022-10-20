import React from "react";
import CardHotel from "../CardHotel/CardHotel";
import Loader from "../Loader/Loader";
import NavFilters from "../NavFilters/NavFilters";
import "./CardHotels.css";

const CardHotels = ({ hotels, actualHotels }) => {
  return (
    <div className="cardHotels-container">
      <NavFilters />
      {actualHotels.length && Array.isArray(actualHotels) ? (
        actualHotels.map((h) => (
          <CardHotel
            key={h.id}
            id={h.id}
            image={h.image}
            name={h.name}
            qualification={h.qualification}
            location={h.Locations.map(
              (l) => `${l.city}, ${l.department}, ${l.state}`
            ).join(", ")}
          />
        ))
      ) : (
        !actualHotels.length
        ? <Loader />
        : <h1 className="my-5">{hotels}</h1>
      )}
    </div>
  );
};

export default CardHotels;
