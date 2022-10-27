import axios from 'axios';
import { toast } from "react-toastify";
import { CLEAR_CART } from './cartAction';
export const POST_STRIPE = "POST_STRIPE";
export const POST_BOOKING = "POST_BOOKING";
export const GET_ALL_BOOKINGS = 'GET_ALL_BOOKINGS';
export const GET_BOOKING = 'GET_BOOKING';


const BACK_URL = "http://localhost:3001";


//-----------------------POST A STRIPE-------------------
export default function postStripe(payload, booking) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${BACK_URL}/stripe`, payload);
      console.log('data', data)
      dispatch({
        type: POST_STRIPE,
        payload
      })
      toast.success(`${data.message}, please check your email`, { position: "bottom-right" })
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


export function getAllBooking(){
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

