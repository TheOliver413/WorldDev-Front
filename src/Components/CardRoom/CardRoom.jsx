import React from "react";
import "./CardRoom.css";

const CardRoom = ({ id, name, image, price, description }) => {
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-sm-4">
          <img src={image} className="img-fluid rounded-start" alt={name} />
        </div>
        <div className="col-sm-8">
          <div className="card-body">
            <div className="row mb-2">
              <h2 className="card-title col-sm-10">{name}</h2>
              <p className="card-text col-sm-2">${price}</p>
            </div>
            <p className="card-text">{description}</p>
            <div className="d-grid gap-2 d-sm-block">
              <button className="btn btn-primary mt-4" type="button">Read more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRoom;
