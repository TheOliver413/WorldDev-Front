import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cleanHistory, getBookingByIdUser } from "../../redux/action/actionStripe";
import "./HistoryBookings.css"

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
    console.log('userrrid', user.uid)
    const book = booksUser?.map(e => e.cartRoom).flat()
    console.log('ID-HOTEL', book)
    return (
        <>
            {book.length ?
                book.map(e => (
                    <div className="card">
                        <div class="card-header">
                            <h5>Hotel: <Link style={{ textDecoration: 'none' }} className={"color"} to={`/hotel/${e.idHotel}`}>{e.hotel}</Link></h5>
                        </div>
                        <div class="card-body">
                        <h5 className="card-title">Reservation Date: {e.date}</h5>
                            <ul className="list-group">
                                <li className="list-group-item"><span className="negrilla">Room:</span>  {e.name}</li>
                                <li className="list-group-item"><span className="negrilla">CheckIn:</span> {e.checkIn}</li>
                                <li className="list-group-item"><span className="negrilla">CheckOut:</span> {e.checkOut}</li>
                                <li className="list-group-item"><span className="negrilla">Quantity:</span> {e.cartQuantity}</li>
                                <li className="list-group-item"><span className="negrilla">Price:</span> {e.price}</li>
                                <li className="list-group-item"><span className="negrilla">Status:</span> {e.status}</li>
                                <Link to={`/hotel/${e.idHotel}/review`}><button type='button' className="btn btn-outline-info btn-lg borders">Please leave us Your Review </button></Link>
                            </ul>
                        </div>
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