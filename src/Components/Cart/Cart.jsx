import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import { getTotals, removeRoomFromCart } from "../../redux/action/cartAction";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { cartRooms, cartTotalAmount } = useSelector((state) => state.reducerCart);

  useEffect(()=> {
    dispatch(getTotals())
  }, [dispatch, cartTotalAmount])

  const handleRemoveFromCart = (room) => dispatch(removeRoomFromCart(room))

  return (
    cartRooms.length ? (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Room</th>
              <th scope="col">Check-in</th>
              <th scope="col">Check-out</th>
              <th scope="col">N° of room/s</th>
              <th scope="col">Final price</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {cartRooms.map((r) => (
              <tr key={r.id}>
                <td><Link to={`/hotel/room/${r.id}`}>{r.name}</Link></td>
                <td>{format(new Date(r.checkIn), 'dd/MM/yy')}</td>
                <td>{format(new Date(r.checkOut), 'dd/MM/yy')}</td>
                <td>
                  <button className="p-1 btn" type="button">-</button>
                  {r.cartQuantity}
                  <button className="p-1 btn" type="button">+</button>
                  <br />
                  <button onClick={() => handleRemoveFromCart(r)} className="p-0 btn" type="button">Remove</button>
                </td>
                <td>${r.totalPrice * r.cartQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="mt-5">Total: ${cartTotalAmount}</h3>
        <button type="button" className="btn btn-primary my-4">
          Book now
        </button>
        <Link to='/home'>
          <p>&laquo; Continue shopping</p>
        </Link>
      </>
    ) : (
      <div className="my-5 py-4 px-2">
        <h1 className="mb-4">No rooms added to cart</h1>
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => navigate("/home")}
        >
          See hotels
        </button>
      </div>
    )
  );
}

export default Cart;
