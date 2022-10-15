import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { roomById } from '../../redux/action/action.js';
import Loader from '../Loader/Loader.jsx';


const RoomDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(roomById(id))
  }, [dispatch, id])

  const roomDetail = useSelector((state) => state.reducerRoom.detailRoom)

  return (
    <div>
      {
        roomDetail.name ?
          <div>
            {/* <div>
              <Link to='/hotel/:id'><button>Hotel</button></Link>
            </div> */}

            <img src={roomDetail.image} />

            <div>
              <h2>{roomDetail.name}</h2>
            </div>

            <div>
              <p>{roomDetail.description}</p>
            </div>

            <p>Check-in: <input type='date' /></p>
            <p>Check-out: <input type='date' /></p>
            <p>Person: <input type='number' /></p>

            {/* Aca va la cuenta para sacar el precio */}
            {/* <div>
              <p>The price is {roomDetail.price}</p>
            </div> */}

            {/* FALTA SERVICIOS CON ICONOS */}

            <div>
              <p>It is what you are looking for? <button>ADD TO CART</button></p>
              {/* falta agregar logica al boton para que lo agregue al carrito */}
            </div>

          </div> : <Loader />
      }
    </div>
  )
}

export default RoomDetail;