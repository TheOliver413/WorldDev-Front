import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cleanRoomDetail, getDetailRoom } from "../../redux/action/action.js";
import { addRoomToCart } from "../../redux/action/cartAction.js";
import { addDays, format, differenceInDays } from 'date-fns'
import { toast } from "react-toastify";
import './RoomDetail.css'
import { getAllBooking } from "../../redux/action/actionStripe.js";
import { useAuth } from "../../context/AuthContext";
import { addRoomToFavorites, getFavoritesID, removeRoomFromFavorites } from "../../redux/action/favoriteAction.js";

const RoomDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const roomDetail = useSelector((state) => state.reducerRoom.detailRoom);
  const { name, image, price, description, ServicesRooms } = roomDetail;
  const { user } = useAuth();
  const { IDs } = useSelector(state => state.reducerFavorite)
  const [isFavorite, setIsFavorite] = useState(IDs.includes(id))

  const { cartRooms } = useSelector(state => state.reducerCart)
  const allBookings = useSelector(state => state.reducerStripe.allBooking);//todas las reservas

  const [error, setError] = useState(false)

  const handleFavorite = () => {
    if (!user) return toast.error('You must log in to add a room to favorites', { position: 'bottom-right' })

    setIsFavorite(!isFavorite)
    isFavorite
      ? dispatch(removeRoomFromFavorites(roomDetail, user.uid))
      : dispatch(addRoomToFavorites(roomDetail, user.uid))
  }

  useEffect(() => {
    setIsFavorite(IDs.includes(id))
  }, [id, IDs])

  useEffect(() => {
    dispatch(getAllBooking())
    dispatch(getDetailRoom(id));
    dispatch(getFavoritesID(user?.uid))
    return () => cleanRoomDetail()
  }, [dispatch, id, user?.uid]);

  //manejo del date input  
  const [checkIn, setCheckIn] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'))

  const handleCheckInChange = (e) => { setCheckIn(e.target.value) }
  const handleCheckOutChange = (e) => { setCheckOut(e.target.value) }

  const finalPrice = price * differenceInDays(new Date(checkOut), new Date(checkIn)) > 0 ? price * differenceInDays(new Date(checkOut), new Date(checkIn)) : price;
  const difDays = differenceInDays(new Date(checkOut), new Date(checkIn)) <= 0 ? 1 : differenceInDays(new Date(checkOut), new Date(checkIn))

  //CONTROL DE STOCK----------HOLA JUAN CARLOS!! NI SE TE OCURRA TOCAR EL STOCK!!!!----------------------------------

  const stockControl = () => {
    const quantity = (cartRooms.find(e => e.id === id && checkIn >= e.checkIn && checkIn <= e.checkOut)?.cartQuantity) + 1

    let booksId = []

    if (allBookings.length) {
      for (let i = 0; i < allBookings.length; i++) {
        let book = (allBookings[i].cartRoom?.filter(e => e.id === id))
        if (book.length) {
          booksId.push(book)
        }
      }

      //---------------------------------ALLBOKKING-------------------------
      if (booksId.length) {//______________bookid-----------
        booksId = booksId.flat()
        booksId?.forEach(e => {
          if (checkIn >= e.checkIn && checkIn <= e.checkOut) {
            if (e.newStock <= 0) {
              setError(true)
              return toast.error('The selected date is not available', { position: 'bottom-right' });
            } else if (e.newStock > 0 && e.newStock <= quantity) {
              setError(true)
              return toast.error('There is not enough availability for the selected date', { position: 'bottom-right' });
            } else {
              setError(false)
            }
          } else {
            if (roomDetail.stock <= 0) {
              setError(true)
              return toast.error('There is no availability for this room at the moment', { position: 'bottom-right' });
            } else if (roomDetail.stock > 0 && roomDetail.stock <= quantity) {
              setError(true)
              return toast.error('There is not enough availability for the selected date', { position: 'bottom-right' })
            } else {
              setError(false)
            }
          }

        })
        //_____________________bookid________________________-

      } else {// chequea con el stock original
        if (roomDetail.stock <= 0) {
          setError(true)
          return toast.error('There is no availability for this room at the moment', { position: 'bottom-right' });
        } else if (roomDetail.stock > 0 && roomDetail.stock <= quantity) {
          setError(true)
          return toast.error('There is not enough availability for the selected date', { position: 'bottom-right' })
        } else {
          setError(false)
        }
      }
      ///----------------------------ALLBOOKING-----------------------
    } else {// chequea con el stock original
      if (roomDetail.stock <= 0) {
        setError(true)
        return toast.error('There is no availability for this room at the moment', { position: 'bottom-right' });
      } else if (roomDetail.stock > 0 && roomDetail.stock <= quantity) {
        setError(true)
        return toast.error('There is not enough availability for the selected date', { position: 'bottom-right' })
      } else {
        setError(false)
      }
    }
  }
  //--------------------------GRACIAS JUAN CARLOS!!------------------------------------------------

  const handleAddToCart = () => {
    stockControl()
    dispatch(addRoomToCart({
      ...roomDetail,
      totalPrice: finalPrice,
      checkIn,
      checkOut
    }))
  }

  return (
    <>
      {roomDetail.name ? (
        <div className="roomDetail-container text-start">
          <div id="carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="3000">
                <img src={image[0]} className="roomDetail-img" alt={name} />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src={image[1]} className="roomDetail-img" alt={name}></img>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src={image[2]} className="roomDetail-img" alt={name}></img>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="roomDetail-body">
            <h1 className="roomDetail-title mt-2">{name}</h1>
            <p>{description}</p>

            {/*  SERVICIOS CON ICONOS */}
            <div className="list-group list-group-horizontal">
              {ServicesRooms.map(e => (
                <li key={e.id} className="list-group-item">
                  <img style={{width: "50px", height: "50px", margin: "auto"}} src={e.image} alt='' />
                  <span>{e.name}</span>
                </li>
              ))}
            </div>

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
              <strong>${finalPrice}</strong>
            </p>

            <p className="mt-4">
              It is what you are looking for?&nbsp;
              {
                checkIn >= checkOut || error ?
                  toast.error('The check-out date should be greater than the check-in date', { position: 'bottom-right' }) &&
                  <button onClick={handleAddToCart} className='btn btn-primary mx-sm-2' disabled>ADD TO CART</button>
                  :
                  <button onClick={handleAddToCart} className='btn btn-primary mx-sm-2'>ADD TO CART</button>
              }
            </p>

            <button className='btn btn-primary my-3' onClick={handleFavorite} type="button">
              <svg fill={isFavorite ? '#E53A27' : 'grey'} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
            </button>
            <br />
            <button onClick={() => navigate(-1)} className="btn btn-primary" type="button">
              Back
            </button>
          </div>
        </div>
      ) : (
        <h3 className="roomDetail-loading text-start">Loading room detail...</h3>
      )}
    </>
  );
};

export default RoomDetail
