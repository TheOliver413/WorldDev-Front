import { GET_BOOKING, GET_ALL_BOOKINGS, POST_BOOKING, POST_STRIPE } from '../action/actionStripe';

const initialStateStripe = {
    stripe: [],
    allBooking: [],
    booking: [],
};

const stripe_reducer = (state = initialStateStripe, action) => {
    switch (action.type) {
        case POST_STRIPE:
            return {
                ...state
            }
        case POST_BOOKING:
            return {
                ...state
            }
        case GET_ALL_BOOKINGS:
            return {
                ...state,
                allBooking: action.payload
            }
        case GET_BOOKING:
            return {
                ...state,
                booking: action.payload
            }
        default:
            return {
                ...state
            }
    }
}



export default stripe_reducer;