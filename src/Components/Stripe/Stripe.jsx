import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import postStripe, { getAllBooking } from "../../redux/action/actionStripe";
import { toast } from "react-toastify";
import { format } from 'date-fns';
import { getDetailRoom } from "../../redux/action/action";
import { useNavigate } from "react-router-dom";
import "./Styles.css"


const stripePromise = loadStripe("pk_test_51Lv6iyAgVz7gSSKmM3Nn4gPDG0b2m1ao5epp7hU2zrhEiq9BXLQMX4Vp6Sqqq1VQbqgNtEny7WdAWO5zSnjPjn0i00AkkxU0oH");

const CheckoutForm = () => {
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { cartRooms, cartTotalAmount, cartTotalQuantity } = useSelector(state => state.reducerCart)
    const allBookings = useSelector(state => state.reducerStripe.allBooking)
    const detailRooms = useSelector(state => state.reducerRoom.detailRoom)
    const [loading, setLoading] = useState(false);

    const idRooms = cartRooms?.map(e => e.id) //id de room del carrito

    useEffect(() => {
        dispatch(getAllBooking())
        dispatch(getDetailRoom(idRooms[0]))
    }, [dispatch])

    const quantity = cartRooms[0]?.cartQuantity
    const checkinfind = []// son todas las reservas de la DB que coinciden con los id de idRooms   

    for (let i = 0; i < allBookings.length; i++) {
        for (let j = 0; j < idRooms.length; j++) {
            let book = (allBookings[i].Rooms).find(e => e.id === idRooms[j])
            if (book) {
                checkinfind.push(allBookings[i])  //pushea a checkingfind las rooms con mismo id
            }
        }
    }

    const checkInFinded = checkinfind.length ? (checkinfind.filter(e => cartRooms[0]?.checkIn >= format(new Date(e.checkIn), 'yyyy-MM-dd') && cartRooms[0]?.checkIn <= format(new Date(e.checkOut), 'yyyy-MM-dd'))).sort((a, b) => a.stock - b.stock) : []
    // checkFinded son todas las reservas de la DB que coinciden con la fecha del carrito   

    const stockRoom = detailRooms.stock

    const currentStock = checkInFinded.length ? (checkInFinded[0].stock - quantity) : (stockRoom - quantity)

    const booking = {
        cartTotalQuantity: cartTotalQuantity,
        cartTotalAmount: cartTotalAmount,
        checkIn: cartRooms[0]?.checkIn,
        checkOut: cartRooms[0]?.checkOut,
        stock: currentStock,
        idRoom: idRooms
    }

    // console.log('booking', booking)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;
            dispatch(postStripe({ id, amount: cartTotalAmount, description: cartRooms }, booking))
            setLoading(true)
            elements.getElement(CardElement).clear();
            setLoading(false)
            setTimeout(() => {
                navigate('/home')
            }, 8000);
        } else {
            toast.error('Unprocessed Payment', { position: 'bottom-right' })
        }
    };



    return (
        <form className="card card-body gap-1" onSubmit={handleSubmit}>
            {/* Product Information */}
            {/* <img src={cartRooms[0]?.image} alt="hotel image" className="img-fluid" /> */}

            <h3>Reservation detail</h3>
            {cartRooms.map(e => <><img src={e.image} alt={e.name} /><p>{`${e.name}, ${e.category}. $${e.price} - quantity ${e.cartQuantity}`}</p></>)}
            <p>Total quantity of rooms booked : {cartTotalQuantity}</p>
            <h5 className="text-center">Total to pay: ${cartTotalAmount}</h5>
            <p className="text-center">Enter your credit or debit card details</p>

            {/* User Card Input */}
            <div className="form-group">
                <CardElement />
            </div>
            <button disabled={!stripe} className="btn btn-success">
                {loading ? (
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only"></span>
                    </div>
                ) : (
                    "Pay"
                )}
            </button>
            <p><i className="bi bi-info-circle icon-success"></i> Once the payment has been processed, you will receive a reservation confirmation email.</p>
        </form>
    );
};

function Stripe() {
    return (
        <Elements stripe={stripePromise}>
            <div className="container p-4">
                <div className="row h-100">
                    <div className="col-md-4 offset-md-4 h-100">
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    );
}

export default Stripe;