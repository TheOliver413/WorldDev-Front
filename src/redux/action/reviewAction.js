import axios from "axios";
import { toast } from "react-toastify";

export const POST_REVIEW_HOTEL_REQUEST = "POST_REVIEW_HOTEL";
export const POST_REVIEW_HOTEL_SUCCESS = "POST_REVIEW_HOTEL_SUCCESS";
export const POST_REVIEW_HOTEL_FAIL = "POST_REVIEW_HOTEL_FAIL";

const BACK_URL = "https://worlddev-back-op5m.onrender.com";

export function postReviewHotel(payload) {
  return async function (dispatch) {
    try {
      dispatch({
        type: POST_REVIEW_HOTEL_REQUEST,
      });
      await axios.post(`${BACK_URL}/reviews`, payload);
      dispatch({
        type: POST_REVIEW_HOTEL_SUCCESS,
      });
      toast.success(`Review submitted successfully`, {
        position: "bottom-right",
      });
    } catch (e) {
      toast.error(`Error, ${e.response.data}`, { position: "bottom-right" });
      dispatch({
        type: POST_REVIEW_HOTEL_FAIL,
        payload: e.response.data,
      });
    }
  };
}
