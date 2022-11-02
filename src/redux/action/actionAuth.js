import axios from 'axios';
export const GET_BLOCKED ="GET_BLOCKED";
export const PUT_USERS = "PUT_USERS";
export const POST_USERS = "POST_USERS";
export const GET_DETAIL_USER = "GET_DETAIL_USER";
export const GET_ALL_ADMINS ="GET_ALL_ADMINS";
export const GET_ALL_USERS ="GET_ALL_USERS";
export const DELETE_USERS ="DELETE_USERS";
export const CLEAN_FORM_ADMIN = "CLEAN_FORM_ADMIN"

const BACK_URL = "http://localhost:3001"

export function deleteUsers(id){
  return async function(dispatch) {
    try {
      const delUsers =await axios.delete(`${BACK_URL}/users/${id}`)
      dispatch({
        type:DELETE_USERS,
        payload: delUsers
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}



export function blocked(data){
  return async function(dispatch) {
    try {
      const block = await axios.put(`${BACK_URL}/users/blocked`,data)
      dispatch({
        type: GET_BLOCKED ,
        payload: block.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getAllAdmins(){
  return async function(dispatch) {
    try {
      const getAdmins = await axios.get(`${BACK_URL}/users/admins`)
      dispatch({
        type: GET_ALL_ADMINS,
        payload: getAdmins.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getAllUsers(){
  return async function(dispatch) {
    try {
      const getUsers = await axios.get(`${BACK_URL}/users`)
      dispatch({
        type: GET_ALL_USERS,
        payload: getUsers.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}


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

export function cleanFormAdmin() {
  return {
    type: CLEAN_FORM_ADMIN
  }
}