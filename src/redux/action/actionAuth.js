import axios from 'axios';

export const PUT_USERS = "PUT_USERS";
export const POST_USERS = "POST_USERS";
export const GET_DETAIL_USER = "GET_DETAIL_USER";


const BACK_URL = "http://localhost:3001"

export function getDetailUser(id) {
  return async function (dispatch) {
    try {
      const detailU = await axios.get(`${BACK_URL}/users/${id}`)
      dispatch({
        type: GET_DETAIL_USER,
        payload: detailU.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function createUsers(payload) {
  return async function (dispatch) {
    try {
      const users = await axios.post(`${BACK_URL}/users`, payload)
      dispatch({
        type: POST_USERS,
        payload
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function modifyUsers(payload) {
  return async function (dispatch) {
    try {
      const users = await axios.put(`${BACK_URL}/users`, payload)
      dispatch({
        type: PUT_USERS,
        payload
      })
    } catch (error) {
      console.log(error)
    }
  }
}