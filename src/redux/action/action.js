import axios from 'axios';

export const GET_ALL_HOTELS = "GET_ALL_HOTELS";
export const GET_ALL_ROOMS = "GET_ALL_ROOMS";
export const SEARCH_NAME_HOTEL = "SEARCH_NAME_HOTEL";
export const SEARCH_NAME_ROOM = "SEARCH_NAME_ROOM";
export const GET_HOTEL_DETAIL = "GET_HOTEL_DETAIL";
export const GET_ROOMS_DETAIL = "GET_ROOMS_DETAIL";
export const CLEAR_HOTEL_DETAIL = "CLEAR_HOTEL_DETAIL";
export const CLEAR_ROOM_DETAIL = "CLEAR_ROOM_DETAIL";
export const GET_ALL_SERVICES_HOTEL = "GET_ALL_SERVICES_HOTEL";
export const POST_HOTEL = "POST_HOTEL";
export const POST_ROOM = "POST_ROOM";
export const GET_ALL_LOCATIONS = 'GET_ALL_LOCATIONS'
export const FILTER_BY_CITY = 'FILTER_BY_CITY'

export const CREATE_HOTELS = "CREATE_HOTELS";
export const CREATE_ROOMS = "CREATE_ROOMS";
export const URL_POST_HOTEL = "URL_POST_HOTEL";
export const URL_POST_ROOM = "URL_POST_ROOM";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const ORDER_BY = "ORDER_BY";
export const GET_CATEGORY = "GET_CATEGORY";
export const POST_SERVICES_HOTEL = 'POST_SERVICES_HOTEL';
export const PUT_SERVICES_HOTEL = 'PUT_SERVICES_HOTEL';
export const POST_SERVICES_ROOM = 'POST_SERVICES_ROOM';
export const PUT_SERVICES_ROOM = 'PUT_SERVICES_ROOM';
export const POST_EVENT = 'POST_EVENT';
export const PUT_EVENT = 'POST_EVENT';


export const SET_ACTUAL_PAGE = "SET_ACTUAL_PAGE";
export const SET_MIN_PAGE_NUMBER = "SET_MIN_PAGE_NUMBER";
export const SET_MAX_PAGE_NUMBER = "SET_MAX_PAGE_NUMBER";


const BACK_URL = "http://localhost:3001"

//pagination
export function setActualPage (n) {
  return {
    type: SET_ACTUAL_PAGE,
    payload: n
  }
}
export function setMinPageNumber (n) {
  return {
    type: SET_MIN_PAGE_NUMBER,
    payload: n
  }
}
export function setMaxPageNumber (n) {
  return {
    type: SET_MAX_PAGE_NUMBER,
    payload: n
  }
}

//----------------------- HOTELS ------------------------------//

export function clearDetail () {
  return {
    type: CLEAR_DETAIL
  }
}

export function filterByCity (value) {
  return async function (dispatch) {
    const filteredHotelByCity = await axios.get(`${BACK_URL}/filtersHotels/location?filter=${value}`)
    dispatch({
      type: FILTER_BY_CITY,
      payload: filteredHotelByCity.data
    })
  }
}

export function getLocations() {
  return async function (dispatch) {
    const hotels = await axios.get(`${BACK_URL}/hotels`)
    const citiesSet = new Set(hotels.data.map(h => h.Locations.map(l => l.city)).flat())
    const citiesArr = [...citiesSet]
    dispatch({
      type: GET_ALL_LOCATIONS,
      payload: citiesArr
    })
  }
}

export function getCategory(payload){
  return{
      type: GET_CATEGORY,
      payload
  }
};

export function postHotel(payload){
  return async function(dispatch) {
    try {
      const hotels = await axios.post(`${BACK_URL}/hotels`,payload)
      return dispatch ({
        type: POST_HOTEL,
        payload: hotels
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getDetailHotel(id){
  return async function(dispatch) {
    try {
      const detailH = await axios.get(`${BACK_URL}/hotels/${id}`)
      return dispatch({
        type: GET_HOTEL_DETAIL, 
        payload: detailH.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getHotels() {
  return async function (dispatch) {
    let hotels = await axios.get(`${BACK_URL}/hotels`)
    dispatch({
      type: GET_ALL_HOTELS,
      payload: hotels.data
    })
  }
}

export function hotelByName(name) {
  return async function (dispatch) {
    try {
      if (name) {
        let hotelName = await axios.get (`${BACK_URL}/hotels?name=${name}`)
        return dispatch({
          type: SEARCH_NAME_HOTEL,
          payload: hotelName.data
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function postRoom(payload){
  return async function(dispatch) {
    try {
      const rooms = await axios.post(`${BACK_URL}/rooms`,payload)
      dispatch ({
        type: POST_ROOM,
        payload: rooms
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getDetailRoom(id){
  return async function(dispatch) {
    try {
      const detailR = await axios.get(`${BACK_URL}/rooms/${id}`)
      return dispatch({
        type: GET_ROOMS_DETAIL, 
        payload: detailR.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getRooms() {
  return async function (dispatch) {
    let rooms = await axios.get(`${BACK_URL}/rooms`)
    dispatch({
      type: GET_ALL_ROOMS,
      payload: rooms.data
    })
  }
}

export function roomByName(name) {
  return async function (dispatch) {
    try {
      if (name) {
        let roomName = await axios.get (`${BACK_URL}/rooms?name=${name}`)
        return dispatch({
          type: SEARCH_NAME_ROOM,
          payload: roomName.data
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

//PAULA

export function getAllServicesHotel(){
  return async function (dispatch) {
    try {
      const services= await axios.get(`${BACK_URL}/serviceHotels`)
      return dispatch({
        type: GET_ALL_SERVICES_HOTEL,
        payload: services
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function orderBy(payload){
  return{
      type: ORDER_BY,
      payload
  }
};

//HERNAN

//-------------------------CREATE HOTELS----------------------//
export function createHotels(payload) {

  return async function(dispatch) {

      try {
          const newHotel = await axios.post( URL_POST_HOTEL , payload)
          //console.log("info hacia el back: ", payload)
          return dispatch({
              type: CREATE_HOTELS,
              payload: newHotel
          })
      } catch (error) {
          console.log(error && alert("Error, when create Hotel!!"))

      }
  }
}

//-------------------------CREATE ROOMS----------------------//
export function createRooms(payload) {

  return async function(dispatch) {

      try {
          const newRoom = await axios.post( URL_POST_ROOM , payload)
          //console.log("info hacia el back: ", payload)
          return dispatch({
              type: CREATE_ROOMS,
              payload: newRoom
          })
      } catch (error) {
          console.log(error && alert("Error, when create Room!!"))

      }
  }
}

//------------------------CREATE/MODIFY SERVICES HOTEL --------------------//

export function createServicesHotels(payload) {
  return async function (dispatch) {
    try {
      const servicesHotel = await axios.post(`${BACK_URL}/serviceHotels`,payload)
      dispatch ({
        type: POST_SERVICES_HOTEL,     
      })      
    } catch (error) {
      console.log(error)
    }
  }}

  export function modifyServicesHotels(payload) {
    return async function (dispatch) {
      try {
        const servicesHotel = await axios.put(`${BACK_URL}/serviceHotels`,payload)
        dispatch ({
          type: PUT_SERVICES_HOTEL,     
        })      
      } catch (error) {
        console.log(error)
      }
    }}
//------------------------CREATE/MODIFY SERVICES ROOM --------------------//

  export function createServicesRooms(payload) {
    return async function (dispatch) {
      try {
        const servicesRoom = await axios.post(`${BACK_URL}/serviceRooms`,payload)
        dispatch ({
          type: POST_SERVICES_ROOM,     
        })        
      } catch (error) {
        console.log(error)
      }
    }}

    export function  modifyServicesRooms(payload) {
      return async function (dispatch) {
        try {
          const servicesRoom = await axios.put(`${BACK_URL}/serviceRooms`,payload)
          dispatch ({
            type: PUT_SERVICES_ROOM,     
          })        
        } catch (error) {
          console.log(error)
        }
      }}
//------------------------CREATE/MODIFY EVENTS --------------------//
    export function createEvents(payload) {
      return async function (dispatch) {
        try {
          const servicesRoom = await axios.post(`${BACK_URL}/events`,payload)
          dispatch ({
            type: POST_EVENT,     
          })        
        } catch (error) {
          console.log(error)
        }
      }}

      export function modifyEvents(payload) {
        return async function (dispatch) {
          try {
            const servicesRoom = await axios.put(`${BACK_URL}/events`,payload)
            dispatch ({
              type: PUT_EVENT,     
            })        
          } catch (error) {
            console.log(error)
          }
        }}
