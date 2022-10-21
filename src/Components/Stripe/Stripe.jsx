import React, { useState } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import postStripe from "../../redux/action/actionStripe";

const stripePromise = loadStripe("pk_test_51Lv6iyAgVz7gSSKmM3Nn4gPDG0b2m1ao5epp7hU2zrhEiq9BXLQMX4Vp6Sqqq1VQbqgNtEny7WdAWO5zSnjPjn0i00AkkxU0oH");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        setLoading(true);

        if (!error) {
            // console.log(paymentMethod)
            const { id } = paymentMethod;
            dispatch(postStripe({id, amount:10000}))
            elements.getElement(CardElement).clear();
            setLoading(false);
        }
    };

    console.log(!stripe || loading);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            {/* Product Information */}
            <img src="" alt="imagen producto" className="img-fluid" />

            <h3 className="text-center my-2">Price: 100$</h3>

            {/* User Card Input */}
            <div className="form-group">
                <CardElement />
            </div>

            <button disabled={!stripe} className="btn btn-success">
                {loading ? (
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    "Buy"
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