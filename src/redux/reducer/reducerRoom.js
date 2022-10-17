import {
  GET_ROOMS_DETAIL,
  GET_ALL_ROOMS,
  POST_SERVICES_ROOM,
  PUT_SERVICES_ROOM,
  GET_SERVICES_ROOM,

} from '../action/action';

const initialStateRooms = {
  rooms: [],
  detailRoom: {},
  servicesRoom: [],
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

    case POST_SERVICES_ROOM:
      return {
        ...state,
      }
    case PUT_SERVICES_ROOM:
      return {
        ...state,
      }
    case GET_SERVICES_ROOM:
        return {
          ...state,
          servicesRoom: action.payload
        }

    default:
      return { ...state }
  }
}

export default rooms_reducer;