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
    setError(false)
    dispatch(addRoomToCart(room))
    stockControl()
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
        if (e.stock <= 0) {
          setError(true)
          return toast.error('There is no availability for this room at the moment', { position: 'bottom-right' });
        } else if (e.stock > 0 && e.stock <= e.cartQuantity) {
          setError(true)
          return toast.error('There is not enough availability for the selected date', { position: 'bottom-right' });
        } else {
          setError(false)
        }
      })

    }
    
    const orderBook = bookRoom.length ? bookRoom.flat().sort((a, b) => { return a.newStock - b.newStock }) : [] // quito los subarray
    console.log('orderBook',orderBook)

     
    if (orderBook.length) {    
      for (let i = 0; i < cartRooms.length; i++) {
        let stockIdCheck = orderBook.find(e => e.id === cartRooms[i].id && cartRooms[i].checkIn >= format(new Date(e.checkIn), 'yyyy-MM-dd') && cartRooms[i].checkIn <= format(new Date(e.checkOut), 'yyyy-MM-dd'))
        
        if (stockIdCheck && stockIdCheck.newStock <= 0) {
          setError(true)
          return toast.error('The selected date is not available', { position: 'bottom-right' })
        }
        else if (stockIdCheck && stockIdCheck.newStock > 0 && stockIdCheck.newStock <= cartRooms[i].cartQuantity) {
          setError(true)
          return toast.error('There is not enough availability for the selected date', { position: 'bottom-right' })
        } else {
          setError(false)
        }
      }
    }else {// sino valido con el stock original
      cartRooms?.forEach(e => {
        if (e.stock <= 0) {
          setError(true)
          return toast.error('There is no availability for this room at the moment', { position: 'bottom-right' });
        } else if (e.stock > 0 && e.stock <= e.cartQuantity) {
          setError(true)
          return toast.error('There is not enough availability for the selected date', { position: 'bottom-right' });
        } else {
          setError(false)
        }
      })
    }
  }
  //--------------------------------------------------------

  return (
    <div className="d-grid gap-4 mx-auto" style={{ maxWidth: '1200px', padding: '2rem' }}>
      <h1 className="fw-bold">Booking cart</h1>
      {cartRooms.length ? (
        <>
          {/* cards */}
          {cartRooms.map((r) => (
            <div className="row g-3 g-md-4 align-items-center" key={r.id + r.checkIn + r.checkOut}>
              {/* img */}
              <div className="col-md-2">
                <img
                  style={{ height: "7rem" }}
                  className="w-100 rounded-3 object-fit-cover"
                  src={r.image[0]}
                  alt={r.name}
                />
              </div>
              {/* room name & check in/out */}
              <div className="col-md-6">
                <h4>
                  <Link className='link-dark link-underline-opacity-0 link-underline-opacity-100-hover' to={`/hotel/room/${r.id}`}>
                    {r.Hotels[0].name}, {r.name}
                  </Link>
                </h4>
                <p className="mb-0">
                  {format(new Date(`${r.checkIn}T03:00:00`), 'dd/MM/yy')} - {format(new Date(`${r.checkOut}T03:00:00`), 'dd/MM/yy')}
                </p>
              </div>
              {/* -, cart quantity, +, remove */}
              <div className="col-md-3 d-md-grid justify-content-md-center">
                <div className="d-flex gap-2">
                  <button className="btn lh-1 px-2 py-1 border-1 border-primary" onClick={() => handleDecreaseCart(r)} type="button">-</button>
                  <span>{r.cartQuantity}</span>
                  <button className="btn lh-1 px-2 py-1 border-1 border-primary" onClick={() => handleIncreaseCart(r)} type="button" disabled={error}>+</button>
                </div>
                <button className="p-0 px-md-2 btn" onClick={() => handleRemoveFromCart(r)} type="button">Remove</button>
              </div>
              {/* room price */}
              <p className="col-md-1 mb-0 text-md-end fw-bold">${r.totalPrice * r.cartQuantity}</p>
            </div>
          ))}
          <hr className="bg-dark opacity-25" />
          {/* total price */}
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-md-between align-items-md-center">
            <Link className="text-dark" to='/home'>
              &laquo; Continue shopping
            </Link>
            <h3 className="fw-bold mb-0">Total: ${cartTotalAmount}</h3>
          </div>
          {/* buttons */}
          <div className="d-flex flex-column align-items-md-end">
            <button className="btn btn-primary" disabled={error} type="button" onClick={() => navigate('/home/stripe')}>
              Book now
            </button>
            <button className="btn" onClick={handleClearCart} type="button">
              Clear cart
            </button>
          </div>
        </>
      ) : (
        <>
          <p>No rooms added to cart</p>
          <button
            className="btn btn-primary"
            style={{ width: "max-content" }}
            type="button"
            onClick={() => navigate("/home")}
          >
            See hotels
          </button>
        </>
      )}
    </div>
  );
}


export default Cart;
