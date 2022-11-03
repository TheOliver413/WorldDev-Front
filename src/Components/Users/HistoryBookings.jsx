import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getHotels } from "../../redux/action/action";
import { cleanHistory, getBookingByIdUser } from "../../redux/action/actionStripe";
import { toast } from "react-toastify";
import Loading from "../Loader/Loading";

const HistoryBookings = () => {

    const dispatch = useDispatch()
    const { user } = useAuth();
    const booksUser = useSelector(state => state.reducerStripe.bookingsUser)


    useEffect(() => {
        if (user && user.hasOwnProperty('uid')) {
            dispatch(getBookingByIdUser(user.uid))
        }
        return () => dispatch(cleanHistory())
    }, [dispatch, user])
console.log('userrrid',user.uid )
    const book = booksUser?.map(e => e.cartRoom).flat()
    return (
        <>
            {book.length ?
                    book.map(e => (
                        <div>
                            <h6>Hotel: <Link to={`/hotel/${e.idHotel}`}>{e.hotel}</Link></h6>
                            <p>Reservation Date: {e.date}</p>
                            <ul>
                                <li>Room: {e.name}</li>
                                <li>CheckIn: {e.checkIn}</li>
                                <li>CheckOut: {e.checkOut}</li>
                                <li>Quantity: {e.cartQuantity}</li>
                                <li>Price: {e.price}</li>
                                <li>Status: {e.status}</li>
                                <li>Please leave us <Link to= {`/hotel/${e.id}/review`}><button type='button' className="btn btn-outline-info"> Your Review </button></Link></li>
                            </ul>                            
                        </div>
                    ))
                    :
                    <div style={{ with: '100%', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h1>No reservations found</h1>
                    </div>
            }
        </>
    )

}
export default HistoryBookings