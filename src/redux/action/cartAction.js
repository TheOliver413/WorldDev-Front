export const ADD_ROOM_TO_CART = 'ADD_ROOM_TO_CART'
export const REMOVE_ROOM_FROM_CART = 'REMOVE_ROOM_FROM_CART'
export const GET_TOTALS = 'GET_TOTALS'

export function addRoomToCart (payload) {
  return {
    type: ADD_ROOM_TO_CART,
    payload
  }
}

export function removeRoomFromCart (payload) {
  return {
    type: REMOVE_ROOM_FROM_CART,
    payload
  }
}

export function getTotals () {
  return {
    type: GET_TOTALS
  }
}
