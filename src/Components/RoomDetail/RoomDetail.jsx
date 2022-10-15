import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetailRoom } from '../../redux/action/action.js';
import Loader from '../Loader/Loader.jsx';


const RoomDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetailRoom(id))
  }, [dispatch, id])

  const roomDetail = useSelector((state) => state.reducerRoom.detailRoom)

  const{name, image, price, description}=roomDetail

  return (
    <div>
      {
        roomDetail.name ?
          <div>
            {/* <div>
              <Link to='/hotel/:id'><button>Hotel</button></Link>
            </div> */}

            <img src={image} alt={name} />

            <div>
              <h1>{name}</h1>
            </div>

            <div>
              <p>{description}</p>
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