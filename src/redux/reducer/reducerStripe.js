import { POST_STRIPE } from '../action/action';

const initialStateStripe = {
    stripe: [],
};

const stripe_reducer = (state = initialStateStripe, action) => {
    switch (action.type) {
        case POST_STRIPE:
            return {
                ...state,
                stripe: action.payload
            }
        default:
            return {
                ...state
            }
    }
}


export default stripe_reducer;