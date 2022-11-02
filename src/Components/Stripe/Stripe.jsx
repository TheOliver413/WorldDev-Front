import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import postStripe, { getAllBooking } from "../../redux/action/actionStripe";
import { toast } from "react-toastify";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import "./Styles.css"
import { getTotals } from "../../redux/action/cartAction";

import SendRecibo from '../emails/sendReceipt';
import { useAuth } from "../../context/AuthContext";


const stripePromise = loadStripe("pk_test_51Lv6iyAgVz7gSSKmM3Nn4gPDG0b2m1ao5epp7hU2zrhEiq9BXLQMX4Vp6Sqqq1VQbqgNtEny7WdAWO5zSnjPjn0i00AkkxU0oH");

const CheckoutForm = () => {
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { user } = useAuth()

    const { cartRooms, cartTotalAmount, cartTotalQuantity } = useSelector(state => state.reducerCart)
    const allBookings = useSelector(state => state.reducerStripe.allBooking)


    const [loading, setLoading] = useState(false);


    useEffect(() => {
        dispatch(getTotals())
        dispatch(getAllBooking())
    }, [dispatch])


    //CONTROL DE STOCK ------------HOLA JUAN CARLOS!! NI SE TE OCURRA TOCAR EL STOCK!!!!--------------
    let aux = []

    let bookRoom = []//array de array de los objetos de allbookin.cartRoom

    if (allBookings.length) {
        for (let i = 0; i < allBookings.length; i++) {
            for (let j = 0; j < cartRooms.length; j++) {
                let book = (allBookings[i].cartRoom?.filter(e => e.id === cartRooms[j].id))
                if (book.length) {
                    bookRoom.push(book)
                } else { // si no encontre reservas con ese id (si el filter no encontro coincidencias)
                    let check = cartRooms?.map(e => ({
                        id: e.id,
                        name: e.name,
                        checkIn: e.checkIn,
                        checkOut: e.checkOut,
                        price: e.price,
                        cartQuantity: e.cartQuantity,
                        newStock: e.stock - e.cartQuantity,
                        hotel: e.Hotels?.map(el => el.name).toString(),
                        address: e.Hotels?.map(el => el.address).toString(),
                        idHotel: e.Hotels?.map(el => el.id).toString(),
                        status: 'confirmed',
                        user: user.uid,
                        date: e.createdAt.substring(0, 10),
                    }))
                    aux = check
                }
            }
        }
        console.log('bookRoom', bookRoom)

    } else { // entra si NO hay ninguna reserva
        let check = cartRooms?.map(e => ({
            id: e.id,
            name: e.name,
            checkIn: e.checkIn,
            checkOut: e.checkOut,
            price: e.price,
            cartQuantity: e.cartQuantity,
            newStock: e.stock - e.cartQuantity,
            hotel: e.Hotels?.map(el => el.name).toString(),
            address: e.Hotels?.map(el => el.address).toString(),
            idHotel: e.Hotels?.map(el => el.id).toString(),
            status: 'confirmed',
            user: user.uid,
            date: e.createdAt.substring(0, 10),
        }))
        aux = check
        console.log('check1', check)
        console.log('aux1', aux)
    }


    const orderBook = bookRoom.length ? bookRoom.flat().sort((a, b) => { return a.newStock - b.newStock }) : []//  array de todas las reservas con el mismo id que el carrito ordenadas de < a > por stock

    if (orderBook.length) {
        for (let i = 0; i < cartRooms.length; i++) {
            let book = orderBook?.find(e => e.id === cartRooms[i].id && cartRooms[i].checkIn >= format(new Date(e.checkIn), 'yyyy-MM-dd') && cartRooms[i].checkIn <= format(new Date(e.checkOut), 'yyyy-MM-dd'))
            if (book) {
                let check = {
                    id: cartRooms[i].id,
                    name: cartRooms[i].name,
                    checkIn: cartRooms[i].checkIn,
                    checkOut: cartRooms[i].checkOut,
                    price: cartRooms[i].price,
                    cartQuantity: cartRooms[i].cartQuantity,
                    newStock: book.newStock - cartRooms[i].cartQuantity,
                    hotel: cartRooms[i].Hotels?.map(el => el.name).toString(),
                    address: cartRooms[i].Hotels?.map(el => el.address).toString(),
                    idHotel: cartRooms[i].Hotels?.map(el => el.id).toString(),
                    status: 'confirmed',
                    user: user.uid,
                    date: cartRooms[i].createdAt.substring(0, 10),

                }
                aux.push(check)
                console.log('orderBook', orderBook)
                console.log('check2', check)
                console.log('aux2', aux)

            } else {
                let check = cartRooms?.map(e => ({
                    id: e.id,
                    name: e.name,
                    checkIn: e.checkIn,
                    checkOut: e.checkOut,
                    price: e.price,
                    cartQuantity: e.cartQuantity,
                    newStock: e.stock - e.cartQuantity,
                    hotel: e.Hotels?.map(el => el.name).toString(),
                    address: e.Hotels?.map(el => el.address).toString(),
                    idHotel: e.Hotels?.map(el => el.id).toString(),
                    status: 'confirmed',
                    user: user.uid,
                    date: e.createdAt.substring(0, 10),
                }))
                aux = check
                console.log('check3', check)
                console.log('aux3', aux)
            }
        }
    }

    //--------------------------------GRACIAS JUAN CARLOS!!! -------------------
    const booking = {
        cartTotalQuantity: cartTotalQuantity,
        cartTotalAmount: cartTotalAmount,
        cartRoom: aux,
        status: 'confirmed',
        user: user.uid
    }
    console.log('cartRoomssss', cartRooms)
    console.log('boooking', booking)
    //---------------------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        setLoading(false)
        if (!error) {
            setLoading(true)
            const { id } = paymentMethod;
            const data = dispatch(postStripe({ id, amount: cartTotalAmount, description: booking }, booking))
            elements.getElement(CardElement).clear();
            setTimeout(() => {
               setLoading(false)
            }, 2500);
            setTimeout(() => {
                navigate('/home')
            }, 8000);
            console.log("EMAIL " + user.email)
            
            SendRecibo(user.email)
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
                    'Pay'
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