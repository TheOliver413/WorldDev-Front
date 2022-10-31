import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getHotels } from "../../redux/action/action";
import { getBookingByIdUser } from "../../redux/action/actionStripe";

const HistoryBookings = () => {

    const dispatch = useDispatch()
    const { user } = useAuth();
    const booksUser = useSelector(state => state.reducerStripe.bookingsUser)
    const hotels = useSelector(state => state.reducerHotel.allHotels)
    

    useEffect(() => {
        dispatch(getHotels())
        if(user && user.hasOwnProperty('uid')) {
        dispatch(getBookingByIdUser(user.uid))}
    }, [user])

    const book = booksUser?.map(e => e.cartRoom).flat()
    const bookHotel = book?.map(e=> ({
        idHotel: e.idHotel,
        hotel: e.hotel,
        date: e.date,
        name: e.name,
        checkIn: e.checkIn,
        checkOut: e.checkOut,
        cartQuantity: e.cartQuantity,
        price: e.price,
        status: e.status
    }))
    console.log('boooookkkHHHHHHHHHH', bookHotel)
    
    


    return (
        <>
            {book?.map(e => (
                
                <div>
                     <h6>Hotel: {e.hotel}</h6>
                    <p>Reservation Date: {e.date}</p>
                    <ul>
                        <li>Room: {e.name}</li>
                        <li>CheckIn: {e.checkIn}</li>
                        <li>CheckOut: {e.checkOut}</li>
                        <li>Quantity: {e.cartQuantity}</li>
                        <li>Price: {e.price}</li>
                        <li>Status: {e.status}</li>
                    </ul>
                </div>
            ))}

        </>
    )

}
export default HistoryBookings