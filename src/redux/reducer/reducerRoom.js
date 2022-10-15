import {
    GET_ROOMS_DETAIL,
    GET_ALL_ROOMS
    
  } from '../action/action';

const initialStateRooms = {
    rooms: [],
    detailRoom: {},
  
  };
  
  const rooms_reducer = (state = initialStateRooms, action) => {
    switch (action.type) {
      case GET_ALL_ROOMS:
        return {
          ...state,
          rooms: action.payload
        }
      case GET_ROOMS_DETAIL:
        return {
          ...state,
          detailRoom: action.payload
        }
  
      default:
        return { ...state }
    }
  }

  export default rooms_reducer;