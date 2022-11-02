import {
    GET_BOOKING,
    GET_ALL_BOOKINGS,
    POST_BOOKING,
    POST_STRIPE,
    GET_BOOKINGS_USER,
    PUT_BOOKING_STATUS,
    GET_BOOKS,
    ORDER_BOOKS_BY_HOTEL,
    ORDER_BOOKS_BY_DATE,
    FILTER_BOOKS_BY_HOTEL,
} from '../action/actionStripe';

const initialStateStripe = {
    stripe: [],
    allBooking: [],
    booking: [],
    bookingsUser: [],
    allBooks: [],
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
        case GET_BOOKINGS_USER:
            return {
                ...state,
                bookingsUser: action.payload
            }
        case PUT_BOOKING_STATUS:
            return {
                ...state,
            }
        case GET_BOOKS:
            return {
                ...state,
                allBooks: action.payload
            }
        case ORDER_BOOKS_BY_HOTEL:
            const allBook =  state.allBooks
            let sortName = action.payload === 'a-z' ?
                allBook?.sort((a, b) => {
                    if (a.hotel > b.hotel) return 1;
                    if (a.hotel < b.hotel) return -1;
                    return 0;
                })
                : allBook?.sort((a, b) => {
                    if (a.hotel > b.hotel) return -1;
                    if (a.hotel < b.hotel) return 1;
                    return 0;
                })
            return {
                ...state,
                allBooks: sortName
            }
        case ORDER_BOOKS_BY_DATE:
            const allBooks =  state.allBooks
            let sortDate = action.payload === 'asc' ?
                allBooks?.sort((a, b) => {
                    if (a.checkIn > b.checkIn) return 1;
                    if (a.checkIn < b.checkIn) return -1;
                    return 0;
                })
                : allBooks?.sort((a, b) => {
                    if (a.checkIn < b.checkIn) return 1;
                    if (a.checkIn > b.checkIn) return -1;
                    return 0;
                })
            return {
                ...state,
                allBooks: sortDate
            }
        case FILTER_BOOKS_BY_HOTEL:
            const books = state.allBooks
            const filterByHotel = books?.filter(e => e.hotel === action.payload)
            return {
                ...state,
                allBooks: filterByHotel
            }
        default:
            return {
                ...state
            }
    }
}



export default stripe_reducer;