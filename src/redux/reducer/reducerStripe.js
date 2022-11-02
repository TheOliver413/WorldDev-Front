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
    FILTER_BOOKS_BY_STATUS,
} from '../action/actionStripe';

const initialStateStripe = {
    stripe: [],
    allBooking: [],
    booking: [],
    bookingsUser: [],
    allBooks: [],// lo modifico
    books:[],//copia - no lo toco

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
                allBooks: action.payload,
                books: action.payload
            }
        case ORDER_BOOKS_BY_HOTEL:
            let sortName = action.payload === 'a-z' ?
                state.allBooks?.sort((a, b) => {
                        if (a.hotel.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.hotel.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                        if (a.hotel.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.hotel.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                        return 0;
                })
                : state.allBooks?.sort((a, b) => {
                        if (a.hotel.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.hotel.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                        if (a.hotel.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.hotel.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                        return 0;
                })
            return {
                ...state,
                allBooks: sortName
            }
        case ORDER_BOOKS_BY_DATE:           
           let sortDate = action.payload === 'asc' ?
                state.allBooks?.sort((a, b) => {
                    if (a.checkIn > b.checkIn) return 1;
                    if (a.checkIn < b.checkIn) return -1;
                    return 0;
                })
                : state.allBooks?.sort((a, b) => {
                    if (a.checkIn < b.checkIn) return 1;
                    if (a.checkIn > b.checkIn) return -1;
                    return 0;
                })
            return {
                ...state,
                allBooks: sortDate
            }
        case FILTER_BOOKS_BY_HOTEL:
            const books = state.books            
            const filterByHotel = books?.filter((el) => el.hotel?.includes(action.payload))
            return {
                ...state,
                allBooks: filterByHotel
            }
            case FILTER_BOOKS_BY_STATUS:
            const book = state.books
            const filterByStatus = book?.filter((el) => el.status?.includes(action.payload))
            return {
                ...state,
                allBooks: filterByStatus
            }
        
        default:
            return {
                ...state
            }
    }
}



export default stripe_reducer;