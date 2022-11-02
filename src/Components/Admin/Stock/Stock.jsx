import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBooksByHotel, filterBooksByStatus, getBooks, orderBooksByDate, orderBooksByHotel, updateStatusBooking } from "../../../redux/action/actionStripe";
import { toast } from "react-toastify";
import { getHotels } from "../../../redux/action/action";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getDetailUser } from "../../../redux/action/actionAuth";

const Stock = () => {

    const { user } = useAuth();
    const datos = useSelector(state => state.reducerAuth.users)

    useEffect(() => {
        if (user && user.hasOwnProperty('uid')) {
            dispatch(getDetailUser(user.uid))
        }
    }, [user])




    const dispatch = useDispatch()
    const { allBooks } = useSelector(state => state.reducerStripe)
    const hotels = useSelector(state => state.reducerHotel.allHotels)

    const [order, setOrder] = useState('')

    useEffect(() => {
        dispatch(getBooks())
        dispatch(getHotels())
    }, [dispatch])


    const handleStatus = (payload) => {
        let confirmation = window.confirm('Are you sure to cancel the reservation?')
        if (confirmation == true) {
            dispatch(updateStatusBooking(payload))
            console.log('eeeeee', payload)
            toast.success('Cancelled reservation ', { position: 'bottom-right' })

        } else {
            toast.error('Reservation not canceled', { position: 'bottom-right' })
        }
    }


    const handleFilterByHotel = (e) => {
        e.preventDefault();
        dispatch(filterBooksByHotel(e.target.value))
        console.log('filter hotel', allBooks)
    }

    const handleFilterByStatus = (e) =>{
        e.preventDefault();
        dispatch(filterBooksByStatus(e.target.value))
    }

    const handleOrderByHotel = (e) => {
        e.preventDefault();
        setOrder(e.target.value)
        dispatch(orderBooksByHotel(e.target.value))
        console.log('order hotel', allBooks)
    }

    const handleOrderByDate = (e) => {
        e.preventDefault();
        setOrder(e.target.value)
        dispatch(orderBooksByDate(e.target.value));
        console.log('order date', allBooks)
    }


    return (

        <div className="container">
        <div className="row">
            <div>
                {
                    datos.rol === "superAdmin" ?
                        <Link to= "/profileSuperAdmin">
                            <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
                        </Link> :
                        <Link to= "/profileAdmin">
                            <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
                        </Link>
                }
            </div>

            <div>
                <h6>Filter</h6>
                <select onChange={(e) => handleFilterByHotel(e)}>
                    <option hidden >By Hotels</option>
                    {hotels && hotels.sort((a, b) => {
                        if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                        if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                        return 0;
                    }).map(e => {
                        return <option key={e.id} value={e.name}>{e.name}</option>
                    })}
                </select>
            </div>
            <div>
                <select onChange={(e) => handleFilterByStatus(e)}>
                    <option hidden>By Status</option>
                    <option value='confirmed'>Confirmed</option>
                    <option value='cancelled'>Cancelled</option>
                </select>
            </div>


            <button type="button" onClick={() => dispatch(getBooks())}>Clear</button>

            <div>
                <h6>Sort</h6>
                <select onChange={handleOrderByHotel}>
                    <option hidden >By Hotels</option>
                    <option value='a-z'>A-Z</option>
                    <option value='z-a'>Z-A</option>
                </select>
            </div>

            <div>
                <select onChange={handleOrderByDate}>
                    <option hidden >By Date</option>
                    <option value='asc'>Check Asc</option>
                    <option value='desc'>Check Desc</option>
                </select>
            </div>


            <h4>BOOKINGS</h4>
            <table className="table" style={{ 'max-width': '1200px', 'margin-inline': 'auto' }}>
                <thead>
                    <tr>
                        <th scope="col">Hotels</th>
                        <th scope="col">Date</th>
                        <th scope="col">Rooms</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Check-in</th>
                        <th scope="col">Check-out</th>
                        <th scope="col">Stock balance</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {allBooks && allBooks?.map((b, i) => (
                        <tr key={i}>
                            <td>{`${b.hotel} ${b.address}`}</td>
                            <td>{b.date}</td>
                            <td>{b.name}</td>
                            <td>USD {b.price}</td>
                            <td>{b.cartQuantity}</td>
                            <td>{b.checkIn}</td>
                            <td>{b.checkOut}</td>
                            <td>{b.newStock}</td>
                            <td>{b.status}</td>
                            <td><button id={b.id} onClick={() => handleStatus({ id: b.id, user: b.user, status: "cancelled" })} className="col-12 btn btn-primary d-flex justify-content-between" type="button">Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    </div>
    )
}

export default Stock;

