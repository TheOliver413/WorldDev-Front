import axios from 'axios';
import { toast } from "react-toastify";

//-------------------HOTELS----------------//
export const GET_ALL_HOTELS = "GET_ALL_HOTELS";
export const GET_HOTEL_DETAIL = "GET_HOTEL_DETAIL";
export const SEARCH_NAME_HOTEL = "SEARCH_NAME_HOTEL";
export const CREATE_HOTELS = "CREATE_HOTELS";
export const UPDATE_HOTELS = "UPDATE_HOTELS";
export const CLEAR_HOTEL_DETAIL = "CLEAR_HOTEL_DETAIL";
export const POST_HOTEL = "POST_HOTEL";

//-------------------ROOMS----------------//
export const GET_ALL_ROOMS = "GET_ALL_ROOMS";
export const GET_ROOMS_DETAIL = "GET_ROOMS_DETAIL";
export const SEARCH_NAME_ROOM = "SEARCH_NAME_ROOM";
export const CLEAR_ROOM_DETAIL = "CLEAR_ROOM_DETAIL";
export const POST_ROOM = "POST_ROOM";
export const UPDATE_ROOMS = "UPDATE_ROOMS";
export const CREATE_ROOMS = "CREATE_ROOMS";
export const ALL_ROOMS = "ALL_ROOMS";

//-------------------SERVICES ROOM----------------//
export const GET_ALL_SERVICES_ROOM = 'GET_SERVICES_ROOM';
export const POST_SERVICES_ROOM = 'POST_SERVICES_ROOM';
export const PUT_SERVICES_ROOM = 'PUT_SERVICES_ROOM';
export const SERVICE_ROOM_BY_ID = 'SERVICE_ROOM_BY_ID'

//-------------------SERVICES HOTEL----------------//
export const GET_ALL_SERVICES_HOTEL = "GET_ALL_SERVICES_HOTEL";
export const PUT_SERVICES_HOTEL = 'PUT_SERVICES_HOTEL';
export const POST_SERVICES_HOTEL = 'POST_SERVICES_HOTEL';
export const GET_SERVICES_HOTEL = 'GET_SERVICES_HOTEL';
export const GET_SERVICE_BY_ID = 'GET_SERVICE_BY_ID';

//-------------------EVENTS----------------//
export const GET_ALL_EVENTS = 'GET_ALL_EVENTS';
export const GET_CATEGORY = "GET_CATEGORY"
export const POST_EVENT = 'POST_EVENT';
export const PUT_EVENT = 'POST_EVENT';
export const GET_EVENT_BY_ID = 'GET_EVENT_BY_ID';

//--------------ORDER/FILTER/CLEAN------------//
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const FILTER_BY_CITY = 'FILTER_BY_CITY'
export const ORDER_BY = "ORDER_BY";

//-------------------PAGINATION----------------//
export const SET_ACTUAL_PAGE = "SET_ACTUAL_PAGE";
export const SET_MIN_PAGE_NUMBER = "SET_MIN_PAGE_NUMBER";
export const SET_MAX_PAGE_NUMBER = "SET_MAX_PAGE_NUMBER";

//-------------------LOCATIONS----------------//
export const GET_ALL_LOCATIONS = 'GET_ALL_LOCATIONS'
export const GET_STATES = "GET_STATES";
export const GET_CITY = "GET_CITY";
export const GET_DEPARTMENT = "GET_DEPARTMENT";

//-----------------URLS----------------------//
const BACK_URL = "http://localhost:3001"
const URL_POST_HOTEL = "http://localhost:3001/hotels";
const URL_POST_ROOM = "http://localhost:3001/rooms";
const URL_GET_STATE = "http://localhost:3001/locations";

//----------------PAGINATION--------------------//

export function setActualPage(n) {
  return {
    type: SET_ACTUAL_PAGE,
    payload: n
  }
}
export function setMinPageNumber(n) {
  return {
    type: SET_MIN_PAGE_NUMBER,
    payload: n
  }
}
export function setMaxPageNumber(n) {
  return {
    type: SET_MAX_PAGE_NUMBER,
    payload: n
  }
}

//--------------------------------------------------//

export function clearDetail() {
  return {
    type: CLEAR_DETAIL
  }
}

export function filterByCity(value) {
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

export function getCategory(payload) {
  return {
    type: GET_CATEGORY,
    payload
  }
};

export function postHotel(payload) {
  return async function (dispatch) {
    try {
      const hotels = await axios.post(`${BACK_URL}/hotels`, payload)
      return dispatch({
        type: POST_HOTEL,
        payload: hotels
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getDetailHotel(id) {
  return async function (dispatch) {
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
        let hotelName = await axios.get(`${BACK_URL}/hotels?name=${name}`)
        return dispatch({
          type: SEARCH_NAME_HOTEL,
          payload: hotelName.data
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: SEARCH_NAME_HOTEL,
        payload: error.response.data
      })
    }
  }
}


export function getDetailRoom(id) {
  return async function (dispatch) {
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

export function getAllRoomsOfHotel(id) {
  return async function (dispatch) {
    let rooms = await axios.get(`${BACK_URL}/rooms/allRooms/${id}`)
    console.log("rooms desde el back: ",rooms)
    dispatch({
      type: ALL_ROOMS,
      payload: rooms.data
    })
  }
}

export function roomByName(name) {
  return async function (dispatch) {
    try {
      if (name) {
        let roomName = await axios.get(`${BACK_URL}/rooms?name=${name}`)
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

export function getAllServicesHotel() {
  return async function (dispatch) {
    try {
      const services = await axios.get(`${BACK_URL}/serviceHotels`)
      return dispatch({
        type: GET_ALL_SERVICES_HOTEL,
        payload: services
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload
  }
};

//-------------------------CREATE HOTELS----------------------//
export function createHotels(payload) {

  return async function (dispatch) {

    try {
      const newHotel = await axios.post(URL_POST_HOTEL, payload)
      return dispatch({
        type: CREATE_HOTELS,
        payload: newHotel
      })
    } catch (error) {
      console.log(error.response.data);
      toast.error("An error occurred while creating the hotel.", {
        position: "bottom-right"
      })
    }
  }
}

//-------------------------CREATE ROOMS----------------------//
export function createRooms(payload) {

  return async function (dispatch) {

    try {
      const newRoom = await axios.post(URL_POST_ROOM, payload)
      console.log("info que se despacha hacia back: ",payload)
      return dispatch({
        type: CREATE_ROOMS,
        payload: newRoom
      })
    } catch (error) {
      console.log(error.response.data);
      toast.error("An error occurred while creating the room.", {
        position: "bottom-right"
      })
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
        payload   
      })      
    } catch (error) {
      console.log(error)
    }
  }
}


  export function modifyServicesHotels(payload) {
    return async function (dispatch) {
      try {
        const servicesHotel = await axios.put(`${BACK_URL}/serviceHotels`,payload)
        dispatch ({
          type: PUT_SERVICES_HOTEL,
          payload     
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
          payload  
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
            payload   
          })        
        } catch (error) {
          console.log(error)
        }
      }}

      export function getServiceRoomById(id) {
        return async function (dispatch) {
          try {
            const serviceRoom = await axios.get(`${BACK_URL}/serviceRooms/${id}`)
            dispatch ({
              type: SERVICE_ROOM_BY_ID,  
              payload: serviceRoom.data
            })        
          } catch (error) {
            console.log(error)
          }
        }}
      
//------------------------CREATE/MODIFY EVENTS --------------------//
    export function createEvents(payload) {
      return async function (dispatch) {
        try {
          const event = await axios.post(`${BACK_URL}/events`,payload)
          dispatch ({
            type: POST_EVENT, 
            payload    
          })        
        } catch (error) {
          console.log(error)
        }
      }}

      export function modifyEvents(payload) {
        return async function (dispatch) {
          try {
            const event = await axios.put(`${BACK_URL}/events`, payload)
            dispatch ({
              type: PUT_EVENT, 
              payload    
            })        
          } catch (error) {
            console.log(error)
          }
        }}

//------------------------GET SERVICES ROOM --------------------//
export function getAllServicesRoom() {
  return async function (dispatch) {
    try {
      const servicesRoom = await axios.get(`${BACK_URL}/serviceRooms`)
      dispatch({
        type: GET_ALL_SERVICES_ROOM,
        payload: servicesRoom.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//------------------------GET SERVICES HOTEL --------------------//
export function getServicesHotel(id) {
  return async function (dispatch) {
    try {
      const servicesHotel = await axios.get(`${BACK_URL}/serviceHotels/hotel/${id}`)
      dispatch({
        type: GET_SERVICES_HOTEL,
        payload: servicesHotel.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getServicesHotelById(id) {
  return async function (dispatch) {
    try {
      const servicesById = await axios.get(`${BACK_URL}/serviceHotels/${id}`)
      dispatch({
        type: GET_SERVICE_BY_ID,
        payload: servicesById.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//------------------------GET EVENTS --------------------//
export function getAllEvents() {
  return async function (dispatch) {
    try {
      const events = await axios.get(`${BACK_URL}/events`)
      dispatch ({
        type: GET_ALL_EVENTS,
        payload: events.data    
      })        
    } catch (error) {
      console.log(error)
    }
  }
}

export function getEventById(id) {
  return async function (dispatch) {
    try {
      const event = await axios.get(`${BACK_URL}/events/${id}`)
      dispatch ({
        type: GET_EVENT_BY_ID,
        payload: event.data    
      })        
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateHotels(payload) {

  return async function (dispatch) {

    try {
      const upDate_Hotel = await axios.put(URL_POST_HOTEL, payload)
      console.log("modify hotel hacia el back:",upDate_Hotel)
      return dispatch({
        type: UPDATE_HOTELS,
        payload: upDate_Hotel
      })
    } catch (error) {
      console.log(error.response.data);
      toast.error("An error occurred while updating the hotel.", {
        position: "bottom-right"
      })
    }
  }
}

export function modifyRooms(payload) {
  return async function(dispatch) {

      try {
          const update_Room = await axios.put( URL_POST_ROOM , payload)
          console.log("modify de rooms hacia el back:",update_Room)
          return dispatch({
              type: UPDATE_ROOMS,
              payload
          })
      } catch (error) {
          console.log(error && alert("Error, when modify Room!!"))

      }
  }
}
//-----------------------GET STATES------------------------//
export function getState(payload) {

  return async function(dispatch) {

      try {
          const states = await axios( URL_GET_STATE )
          // console.log("info de states: ", states)

          return dispatch({
              type: GET_STATES,
              payload: states.data
          })
      } catch (error) {
          console.log(error && alert("Error"))

      }
  }
}

//-----------------------GET DEPARTMENT------------------------//
export function getDepartment(payload) {

  return async function(dispatch) {

      try {
          const departments = await axios( `${URL_GET_STATE}?name=${payload}` )
          console.log("info de department: ", departments.data)
          return dispatch({
              type: GET_DEPARTMENT,
              payload: departments.data
          })
      } catch (error) {
          console.log(error && alert("Error"))

      }
  }
}

//-----------------------GET CITY------------------------//
export function getCity(payload) {

  return async function(dispatch) {

      try {
          const cities = await axios( `${URL_GET_STATE}/city?name=${payload}` )
          console.log("info de cities: ", cities.data)
          return dispatch({
              type: GET_CITY,
              payload: cities.data
          })
      } catch (error) {
          console.log(error && alert("Error"))

      }
  }
}
