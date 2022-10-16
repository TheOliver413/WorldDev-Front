import React from "react";
import CardRoom from "../CardRoom/CardRoom";
import './Favorite.css'

function Favorite() {
  const storage = JSON.parse(localStorage.getItem("favorites"));

  return (
    <>
      <div className='favorite-container'>
        {storage ? (
          storage.map(fav => (
            <CardRoom key={fav.id} id={fav.id} name={fav.name} image={fav.image} price={fav.price} description={fav.description} />
          ))
        ) : (
          <div className='favorite-noFavs'>
            <h3>No rooms added to favorites</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default Favorite;
