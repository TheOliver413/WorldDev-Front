import { POST_STRIPE } from '../action/actionStripe';

const initialStateStripe = {
    stripe: [],
};

const stripe_reducer = (state = initialStateStripe, action) => {
    switch (action.type) {
        case POST_STRIPE:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}


export default stripe_reducer;