import axios from 'axios';
export const POST_STRIPE = "POST_STRIPE";

const BACK_URL = "http://localhost:3001";

export default function postStripe(payload) {
    return async function (dispatch) {
        const { data } = await axios.post(`${BACK_URL}/stripe`, payload);
        console.log('data',data)
      dispatch({
        type: POST_STRIPE,
        payload
      })
      alert(data.message)
    }
  }