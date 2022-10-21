import React, { useState } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import postStripe from "../../redux/action/actionStripe";


const stripePromise = loadStripe("pk_test_51Lv6iyAgVz7gSSKmM3Nn4gPDG0b2m1ao5epp7hU2zrhEiq9BXLQMX4Vp6Sqqq1VQbqgNtEny7WdAWO5zSnjPjn0i00AkkxU0oH");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const {cartRooms, cartTotalAmount} = useSelector(state=> state.reducerCart)
    

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        setLoading(true);
        if (!error) {
            const { id } = paymentMethod;
            dispatch(postStripe({id, amount:cartTotalAmount}))
            elements.getElement(CardElement).clear();
            setLoading(false)            
        }else{
            alert('Unprocessed Payment') 
            setLoading(false)           
        } 
           
    };
   
    console.log(!stripe || loading);
   

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            {/* Product Information */}
            <img src={cartRooms[0].image} alt="hotel image" className="img-fluid" />
            
            <br/>
            <h5>Reservation detail: </h5>
            <span>{cartRooms.map(e=>`${e.name}, ${e.category}`)}</span>
            <br/>
            <h5>Total to pay: USD {cartTotalAmount}</h5>
            <br/>
            <p className="text-center">Enter your credit or debit card details</p>

            {/* User Card Input */}
            <div className="form-group">
                <CardElement />
            </div>
            <br/>
            <button disabled={!stripe} className="btn btn-success">
                {loading ? (
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only"></span>
                    </div>
                ) : (
                    "Pay"
                )}
            </button>
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