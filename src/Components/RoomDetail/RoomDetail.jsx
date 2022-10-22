import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailRoom } from "../../redux/action/action.js";
import { addRoomToCart } from "../../redux/action/cartAction.js";
import { addDays, format, differenceInDays } from 'date-fns'
import { toast } from "react-toastify";
import './RoomDetail.css'

const RoomDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const roomDetail = useSelector((state) => state.reducerRoom.detailRoom);
  const { name, image, price, description } = roomDetail;
  const [isFavorite, setIsFavorite] = useState(JSON.parse(localStorage.getItem('IDs'))?.includes(id))
  const check = useSelector((state) => state.reducerCart.cartRooms);

  const handleFavorite = () => {
    const hasSomething = JSON.parse(localStorage.getItem('favorites'))
    const IDs = JSON.parse(localStorage.getItem('IDs'))

    //si no tengo nada en fav => lo añado x 1ra vez
    if (!hasSomething) {
      localStorage.setItem('favorites', JSON.stringify([roomDetail]));
      localStorage.setItem('IDs', JSON.stringify([id]));
      setIsFavorite(true)
      toast.success(`${name} added to favorites.`, {
        position: 'bottom-right'
      })
    }
    //si ya tengo algo en fav...
    else {
      const favExists = hasSomething.filter(fav => fav.id === id)
      //si NO ESTÁ esta room en fav => la agrego
      if (!favExists.length) {
        localStorage.setItem('favorites', JSON.stringify([...hasSomething, roomDetail]));
        localStorage.setItem('IDs', JSON.stringify([...IDs, id]));
        setIsFavorite(true)
        toast.success(`${name} added to favorites.`, {
          position: 'bottom-right'
        })
      }
      //si SÍ ESTÁ en fav => la elimino
      else {
        const keepFav = hasSomething.filter(fav => fav.id !== id)
        localStorage.setItem('favorites', JSON.stringify(keepFav));
        const keepID = IDs.filter(favID => favID !== id)
        localStorage.setItem('IDs', JSON.stringify(keepID));
        setIsFavorite(false)
        toast.info(`${name} deleted from favorites.`, {
          position: 'bottom-right'
        })
      }
    }
  }

  useEffect(() => {
    dispatch(getDetailRoom(id));
    setIsFavorite(JSON.parse(localStorage.getItem('IDs'))?.includes(id))
  }, [dispatch, id]);

  //manejo del date input  
  const [checkIn, setCheckIn] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'))

  const handleCheckInChange = (e) => {
    setCheckIn(e.target.value)
  }
  const handleCheckOutChange = (e) => { setCheckOut(e.target.value) }

  const finalPrice = price * differenceInDays(new Date(checkOut), new Date(checkIn)) > 0 ? price * differenceInDays(new Date(checkOut), new Date(checkIn)) : price;
  const difDays = differenceInDays(new Date(checkOut), new Date(checkIn)) < 0 ? 1 : differenceInDays(new Date(checkOut), new Date(checkIn))

  const handleAddToCart = () => {
    const checkinfind = check.find(e => e.id == id)//objeto carro
    if (checkinfind) {
      //  2022-10-26  >=   2022-10-25      2022-10-26   <=     2022-10-29
      if (checkIn >= checkinfind.checkIn && checkIn <= checkinfind.checkOut) {
        console.log("Input" + checkIn)
        console.log("Carro" + checkinfind.checkIn)
        toast.error('The selected date is not available', { position: 'bottom-right' })
      }
      else {
        dispatch(addRoomToCart({
          ...roomDetail,
          totalPrice: finalPrice,
          checkIn,
          checkOut
        }))
      }
    }
    else {
      dispatch(addRoomToCart({
        ...roomDetail,
        totalPrice: finalPrice,
        checkIn,
        checkOut
      }))
    }
  }


  return (
    <>
      {roomDetail.name ? (
        <div className="roomDetail-container text-start">
          <img width='100%' src={image} alt={name} />
          <div className="roomDetail-body">
            <h1 className="roomDetail-title mt-2">{name}</h1>
            <p>{description}</p>
            <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
              <div className="d-flex flex-column align-items-start">
                <label>Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  onChange={handleCheckInChange}
                />
              </div>
              <div className="d-flex flex-column align-items-start">
                <label>Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={format(addDays(new Date(checkIn || null), 2), 'yyyy-MM-dd')}
                  onChange={handleCheckOutChange}
                />
              </div>
            </div>
            <p className="mt-4">The price for {difDays} night/s is&nbsp;
              <strong>$ {finalPrice}</strong>
            </p>
            {/* FALTA SERVICIOS CON ICONOS */}

            <p className="mt-4">
              It is what you are looking for?&nbsp;
              {
                checkIn > checkOut ? toast.error('The check-in date cannot be greater than the check-out date', { position: 'bottom-right' }) &&
                  <button onClick={handleAddToCart} className='btn btn-primary mx-sm-2' disabled>ADD TO CART</button>
                  :
                  <button onClick={handleAddToCart} className='btn btn-primary mx-sm-2'>ADD TO CART</button>
              }
            </p>

            <button className='btn btn-primary my-3' onClick={handleFavorite}>
              <svg fill={isFavorite ? '#E53A27' : 'grey'} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
            </button>

            {/* falta agregar logica al boton para que lo agregue al carrito */}
          </div>
        </div>
      ) : (
        <h3 className="roomDetail-loading text-start">Loading room detail...</h3>
      )}
    </>
  );
};

export default RoomDetail;
