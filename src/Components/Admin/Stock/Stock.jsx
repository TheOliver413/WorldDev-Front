import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, updateStatusBooking } from "../../../redux/action/actionStripe";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import FilterStock from "./FilterStock";
import OrderStock from "./OrderStock";
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
    const allBooks = useSelector(state => state.reducerStripe.allBooks)

    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch])

    const handleStatus = (e) => {
        e.preventDefault()
        let confirmation = window.confirm('Are you sure to cancel the reservation?')
        if (confirmation == true) {
            window.confirm('Are you sure to cancel the reservation?', { position: 'bottom-right' })
            dispatch(updateStatusBooking(e.target.value))
            toast.success('Cancelled reservation ', { position: 'bottom-right' })
        } else {
            toast.error('Reservation not canceled', { position: 'bottom-right' })
        }
    }


    return (

        <div class="container">
        <div class="row">
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

            <div className="navfilters-order-filter d-flex justify-content-between align-items-center">
                <FilterStock/>
                <OrderStock/>
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
                    {allBooks?.map(b => (
                        <tr key={b.id}>
                            <td>{`${b.hotel} ${b.address}`}</td>
                            <td>{b.date}</td>
                            <td>{b.name}</td>
                            <td>USD {b.price}</td>
                            <td>{b.cartQuantity}</td>
                            <td>{b.checkIn}</td>
                            <td>{b.checkOut}</td>
                            <td>{b.newStock}</td>
                            <td>{b.status}</td>
                            <td><button value={{id:b.id, user:b.user, status:'cancelled'}} onClick={handleStatus} className="col-12 btn btn-primary d-flex justify-content-between" type="button">Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    </div>
    )
}

export default Stock;