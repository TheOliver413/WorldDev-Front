import React from "react";
import { Link } from "react-router-dom";
import './CardHotel.css'

const CardHotel = ({ id, image, name, qualification, location }) => {
  return (
    <Link to={`/hotel/${id}`} className="card card-hotel">
      <div className="row">
        <img src={image} className="img-fluid" alt={name} />
        <div className="col">
          <div className="card-body">
            <div className="row mb-2">
              <h3 className="card-title col-12">{name}</h3>
              <p className="card-text col-3">✫{qualification}</p>
            </div>
            <p className="card-text">{location}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardHotel;
