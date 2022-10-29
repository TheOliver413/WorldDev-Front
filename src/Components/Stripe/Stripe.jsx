import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import postStripe, { getAllBooking } from "../../redux/action/actionStripe";
import { toast } from "react-toastify";
import { format } from 'date-fns';
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


    const [loading, setLoading] = useState(false);


    useEffect(() => {
        dispatch(getAllBooking())
    }, [dispatch])


    //CONTROL DE STOCK ------------------------------------------------------
    const aux = []
    const bookRoom = [] //array de solo los objetos de allbookin.cartRoom
    if (allBookings.length && cartRooms.length) {
        for (let i = 0; i < allBookings.length; i++) {
            for (let j = 0; j < cartRooms.length; j++) {
                let book = (allBookings[i].cartRoom?.filter(e => e.id === cartRooms[j].id))
                if (book.length) {
                    bookRoom.push(book)
                }
            }
        }
    } else {
        cartRooms.forEach(e => {
            let check = {
                id: e.id,
                checkIn: e.checkIn,
                checkOut: e.checkOut,
                cartQuantity: e.cartQuantity,
                newStock: e.stock - e.cartQuantity
            }
            aux.push(check)
        })
    }

    const orderBook = bookRoom.length ? bookRoom.flat().sort((a, b) => { return a.newStock - b.newStock }) : []//  array de todas las reservas con el mismo id que el carrito ordenadas de < a > por stock

    if (orderBook.length) {
        for (let i = 0; i < cartRooms.length; i++) {
            let book = orderBook.find(e => e.id === cartRooms[i].id && cartRooms[i].checkIn >= format(new Date(e.checkIn), 'yyyy-MM-dd') && cartRooms[i].checkIn <= format(new Date(e.checkOut), 'yyyy-MM-dd'))
            if (book) {
                let check = {
                    id: cartRooms[i].id,
                    checkIn: cartRooms[i].checkIn,
                    checkOut: cartRooms[i].checkOut,
                    cartQuantity: cartRooms[i].cartQuantity,
                    newStock: book.newStock - cartRooms[i].cartQuantity
                }
                aux.push(check)

            } else {
                let check = {
                    id: cartRooms[i].id,
                    checkIn: cartRooms[i].checkIn,
                    checkOut: cartRooms[i].checkOut,
                    cartQuantity: cartRooms[i].cartQuantity,
                    newStock: cartRooms[i].stock - cartRooms[i].cartQuantity
                }
                aux.push(check)
            }
        }
    }

    //-----------------------------------------------------------------------------
    const booking = {
        cartTotalQuantity: cartTotalQuantity,
        cartTotalAmount: cartTotalAmount,
        cartRoom: aux
    }
    //---------------------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;
            dispatch(postStripe({ id, amount: cartTotalAmount, description: booking }, booking))
            setLoading(true)
            elements.getElement(CardElement).clear();
            setLoading(false)
            setTimeout(() => {
                navigate('/home')
            }, 8000);
        } else {
            toast.error('Unprocessed Payment', { position: 'bottom-right' })
        }
    }



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