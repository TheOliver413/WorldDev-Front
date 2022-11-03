import axios from "axios";
import { toast } from "react-toastify";

export const POST_REVIEW_HOTEL_REQUEST = "POST_REVIEW_HOTEL";
export const POST_REVIEW_HOTEL_SUCCESS = "POST_REVIEW_HOTEL_SUCCESS";
export const POST_REVIEW_HOTEL_FAIL = "POST_REVIEW_HOTEL_FAIL";

const BACK_URL = "https://worlddev-back.onrender.com";

export function postReviewHotel(payload) {
  return async function (dispatch) {
    try {
      dispatch({
        type: POST_REVIEW_HOTEL_REQUEST,
      });
      const res = await axios.post(`${BACK_URL}/reviews`, payload);
      console.log("res.data postReviewHotel", res.data);
      dispatch({
        type: POST_REVIEW_HOTEL_SUCCESS,
      });
      toast.success(`Review submitted successfully`, {
        position: "bottom-right",
      });
    } catch (e) {
      console.log("error postReviewHotel", e.response.data);
      toast.error(`Error, ${e.response.data}`, { position: "bottom-right" });
      dispatch({
        type: POST_REVIEW_HOTEL_FAIL,
        payload: e.response.data,
      });
    }
  };
}
