import axios from 'axios';
import { toast } from "react-toastify";
import { CLEAR_CART } from './cartAction';
import SendRecibo from '../../Components/emails/sendReceipt.jsx';

export const POST_STRIPE = "POST_STRIPE";
export const POST_BOOKING = "POST_BOOKING";
export const GET_ALL_BOOKINGS = 'GET_ALL_BOOKINGS';
export const GET_BOOKING = 'GET_BOOKING';
export const GET_BOOKINGS_USER = 'GET_BOOKINGS_USER';
export const PUT_BOOKING_STATUS = 'PUT_BOOKING_STATUS';
export const GET_BOOKS = 'GET_BOOKS';
export const ORDER_BOOKS_BY_HOTEL = 'ORDER_BOOKS_BY_HOTEL';
export const ORDER_BOOKS_BY_DATE = 'ORDER_BOOKS_BY_DATE';
export const FILTER_BOOKS_BY_HOTEL = 'FILTER_BOOKS_BY_HOTEL';
export const FILTER_BOOKS_BY_STATUS = 'FILTER_BOOKS_BY_STATUS';

const BACK_URL = "http://localhost:3001";

//-----------------------POST A STRIPE-------------------
export default function postStripe(payload, booking, receipt) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${BACK_URL}/stripe`, payload);
      console.log('data', data)
      dispatch({
        type: POST_STRIPE,
        payload
      })
      toast.success(`${data.message}, please check your email`, { position: "bottom-right" })
      SendRecibo(receipt.email, data.receipt_url)
      await axios.post(`${BACK_URL}/booking`, booking)
      dispatch({
        type: POST_BOOKING,
        payload
      })
      dispatch({
        type: CLEAR_CART
      })
    } catch (error) {
      console.log(error)
    }
  }
}


export function getAllBooking() {
  return async function (dispatch) {
    try {
      const bookings = await axios.get(`${BACK_URL}/booking`);
      dispatch({
        type: GET_ALL_BOOKINGS,
        payload: bookings.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getBookingById(id) {
  return async function (dispatch) {
    try {
      const booking = await axios.get(`${BACK_URL}/booking/${id}`);
      dispatch({
        type: GET_BOOKING,
        payload: booking.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getBookingByIdUser(id) {
  return async function (dispatch) {
    try {
      const bookingUser = await axios.get(`${BACK_URL}/booking/user/${id}`);
      dispatch({
        type: GET_BOOKINGS_USER,
        payload: bookingUser.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateStatusBooking(payload) {
  return async function (dispatch) {
    try {
      const booking = await axios.put(`${BACK_URL}/booking/status`, payload);
      dispatch({
        type: PUT_BOOKING_STATUS,
        payload
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getBooks() {
  return async function (dispatch) {
    try {
      const books = await axios.get(`${BACK_URL}/books`);
      dispatch({
        type: GET_BOOKS,
        payload: books.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function orderBooksByHotel(payload) {
  return ({ type: ORDER_BOOKS_BY_HOTEL, payload })
}

export function orderBooksByDate(payload) {
  return ({ type: ORDER_BOOKS_BY_DATE, payload })
}

export function filterBooksByHotel(payload) {
  return ({ type: FILTER_BOOKS_BY_HOTEL, payload })
}

export function filterBooksByStatus(payload) {
  return ({ type: FILTER_BOOKS_BY_STATUS, payload })
}


