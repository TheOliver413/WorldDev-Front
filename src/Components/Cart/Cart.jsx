import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import { addRoomToCart, clearCart, decreaseCart, getTotals, removeRoomFromCart } from "../../redux/action/cartAction";
import { toast } from "react-toastify";


function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { cartRooms, cartTotalAmount } = useSelector((state) => state.reducerCart);
  const allBookings = useSelector(state => state.reducerStripe.allBooking)
  const [error, setError] = useState(false)

  useEffect(() => {
    dispatch(getTotals())
  }, [dispatch, cartTotalAmount])

  const handleRemoveFromCart = (room) => {
    setError(false)
    dispatch(removeRoomFromCart(room))
  }
  const handleDecreaseCart = (room) => {
    setError(false)
    dispatch(decreaseCart(room))
  }
  const handleIncreaseCart = (room) => {
    stockControl()
    dispatch(addRoomToCart(room))
  }
  const handleClearCart = () => {
    setError(false)
    dispatch(clearCart())
  }


  //CONTROL DE STOCK-------------------------------------------------------------
  const stockControl = () => {

    let bookRoom = [] //array de solo los objetos de reservas con mismo id

    if (allBookings.length) { // si hay reservas con ese id entro al if
      for (let i = 0; i < cartRooms.length; i++) {
        for (let j = 0; j < allBookings.length; j++) {
          let book = allBookings[j].cartRoom.filter(e => e.id === cartRooms[i].id)
          if (book.length) {
            bookRoom.push(book)
          }
        }
      }
    } else {// sino valido con el stock original
      cartRooms?.forEach(e => {
        if (e.stock === 0) {
          setError(true)
          return toast.error('There is no availability for this room at the moment', { position: 'bottom-right' });
        } else if (e.stock > 0 && e.stock <= ((e.cartQuantity) + 1)) {
          setError(true)
          return toast.error('There is not enough availability for the selected date', { position: 'bottom-right' });
        } else {
          setError(false)
        }
      })

    }
    
    const bookFlat = bookRoom.length ? bookRoom.flat() : bookRoom // quito los subarray

    const checkinfind = [] // array de todas las reservas con misma fecha y id que el carrito 
    if (bookFlat.length) {
      for (let i = 0; i < cartRooms.length; i++) {
        for (let j = 0; j < bookFlat.length; j++) {
          if (bookFlat[j].id === cartRooms[i].id && cartRooms[i].checkIn >= format(new Date(bookFlat[j].checkIn), 'yyyy-MM-dd') && cartRooms[i].checkIn <= format(new Date(bookFlat[j].checkOut), 'yyyy-MM-dd')) {
            checkinfind.push(bookFlat[j])
          }
        }
      }
    }
   
    if (checkinfind.length) {
      let checkStock = checkinfind?.sort((a, b) => { return a.newStock - b.newStock }) // ordeno por stock de menor a mayor
    
      for (let i = 0; i < cartRooms.length; i++) {
        let stockIdCheck = checkStock.find(e => e.id === cartRooms[i].id && cartRooms[i].checkIn >= format(new Date(e.checkIn), 'yyyy-MM-dd') && cartRooms[i].checkIn <= format(new Date(e.checkOut), 'yyyy-MM-dd'))
        if (stockIdCheck?.newStock === 0) {
          setError(true)
          return toast.error('The selected date is not available', { position: 'bottom-right' })
        }
        else if (stockIdCheck.newStock > 0 && stockIdCheck.newStock <= (cartRooms[i].cartQuantity) + 1) {
          setError(true)
          return toast.error('There is not enough availability for the selected date', { position: 'bottom-right' })
        } else {
          setError(false)
        }
      }
    }
  }

  //--------------------------------------------------------

  return (
    cartRooms.length ? (
      <>
        <table className="table" style={{ 'max-width': '1200px', 'margin-inline': 'auto' }}>
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
              <tr key={r.id + r.checkIn + r.checkOut}>
                <td><Link to={`/hotel/room/${r.id}`}>{r.name}</Link></td>
                <td>{format(new Date(`${r.checkIn}T03:00:00`), 'dd/MM/yy')}</td>
                <td>{format(new Date(`${r.checkOut}T03:00:00`), 'dd/MM/yy')}</td>
                <td>
                  <button onClick={() => handleDecreaseCart(r)} className="p-1 btn" type="button">-</button>
                  {r.cartQuantity}
                  {error?
                    <button disabled onClick={() => handleIncreaseCart(r)} className="p-1 btn" type="button">+</button>
                    : <button onClick={() => handleIncreaseCart(r)} className="p-1 btn" type="button">+</button>}
                  <br />
                  <button onClick={() => handleRemoveFromCart(r)} className="p-0 btn" type="button">Remove</button>
                </td>
                <td>${r.totalPrice * r.cartQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="mt-5">Total: ${cartTotalAmount}</h3>
        {error ?
          <button disabled type="button" onClick={() => navigate('/home/stripe')} className="btn btn-primary mt-4">
            Book now
          </button>
          : <button type="button" onClick={() => navigate('/home/stripe')} className="btn btn-primary mt-4">
            Book now
          </button>}
        <br />
        <button onClick={handleClearCart} type="button" className="btn">
          Clear cart
        </button>
        <Link to='/home'>
          <p className="my-4">&laquo; Continue shopping</p>
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
