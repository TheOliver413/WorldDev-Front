import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailRoom } from "../../redux/action/action.js";
import './RoomDetail.css'

const RoomDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const roomDetail = useSelector((state) => state.reducerRoom.detailRoom);
  const { name, image, price, description } = roomDetail;
  const [isFavorite, setIsFavorite] = useState(JSON.parse(localStorage.getItem('IDs'))?.includes(id))

  const handleFavorite = () => {
    const hasSomething = JSON.parse(localStorage.getItem('favorites'))
    const IDs = JSON.parse(localStorage.getItem('IDs'))

    //si no tengo nada en fav => lo añado x 1ra vez
    if (!hasSomething) {
      localStorage.setItem('favorites', JSON.stringify([roomDetail]));
      localStorage.setItem('IDs', JSON.stringify([id]));
      setIsFavorite(true)
      alert(`${name} added to favorites.`)
    }
    //si ya tengo algo en fav...
    else {
      const favExists = hasSomething.filter(fav => fav.id === id)
      //si NO ESTÁ esta room en fav => la agrego
      if (!favExists.length) {
        localStorage.setItem('favorites', JSON.stringify([...hasSomething, roomDetail]));
        localStorage.setItem('IDs', JSON.stringify([...IDs, id]));
        setIsFavorite(true)
        alert(`${name} added to favorites.`)
      } 
      //si SÍ ESTÁ en fav => la elimino
      else {
        const keepFav = hasSomething.filter(fav => fav.id !== id)
        localStorage.setItem('favorites', JSON.stringify(keepFav));
        const keepID = IDs.filter(favID => favID !== id)
        localStorage.setItem('IDs', JSON.stringify(keepID));
        setIsFavorite(false)
        alert(`${name} deleted from favorites.`)
      }
    }
  }

  useEffect(() => {
    dispatch(getDetailRoom(id));
    setIsFavorite(JSON.parse(localStorage.getItem('IDs'))?.includes(id))
  }, [dispatch, id]);

  return (
    <>
      {roomDetail.name ? (
        <div className="roomDetail-container">
          <img width='100%' src={image} alt={name} />
          <h1>{name}</h1>
          <p>{description}</p>
          <p>
            Check-in: <input type="date" />
          </p>
          <p>
            Check-out: <input type="date" />
          </p>
          <p>
            Person: <input type="number" />
          </p>
          {/* Aca va la cuenta para sacar el precio */}
          <p>The price is ${price}</p>
          {/* FALTA SERVICIOS CON ICONOS */}

          <p>
            It is what you are looking for? 
            <button className='btn btn-primary'>ADD TO CART</button>
          </p>
          <button className='btn btn-primary' onClick={handleFavorite}>
            <svg fill={isFavorite ? '#E53A27' : 'grey'} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
          </button>
          {/* falta agregar logica al boton para que lo agregue al carrito */}
        </div>
      ) : (
        <h3 className="roomDetail-loading">Loading room detail...</h3>
      )}
    </>
  );
};

export default RoomDetail;
