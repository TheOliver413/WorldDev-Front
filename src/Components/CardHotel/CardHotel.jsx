import React from "react";
import { Link } from "react-router-dom";
import './CardHotel.css'

const CardHotel = ({ id, image, name, qualification, location }) => {
  const qualificationArr = []
  for (let i = 1; i <= qualification; i++) qualificationArr.push(i)
  
  return (
    <Link to={`/hotel/${id}`} className="card card-hotel">
      <img src={image} alt={name} />
      <div className="col">
        <div className="card-body">
          <div className="row mb-2">
            <h5 className="card-title col-12">{name}</h5>
            <p className="card-text">{qualificationArr.map(() => '★')}</p>
          </div>
          <p className="card-text">{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardHotel;
