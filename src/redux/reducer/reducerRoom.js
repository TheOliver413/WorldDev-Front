import {
  GET_ROOMS_DETAIL,
  GET_ALL_ROOMS,
  POST_SERVICES_ROOM,
  PUT_SERVICES_ROOM,
  GET_ALL_SERVICES_ROOM,
  ALL_ROOMS,
  SERVICE_ROOM_BY_ID,
  CLEAR_SERVICE_ROOM_BY_ID
} from '../action/action';

const initialStateRooms = {
  rooms: [],
  detailRoom: {},
  servicesRoom: [],
  allRooms: [],
  serviceRoomId: {},
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
    case ALL_ROOMS:
      return {
        ...state,
        allRooms: action.payload
      }

    case POST_SERVICES_ROOM:
      return {
        ...state,
      }
    case PUT_SERVICES_ROOM:
      return {
        ...state,
      }
    case GET_ALL_SERVICES_ROOM:
      return {
        ...state,
        servicesRoom: action.payload
      }
    case SERVICE_ROOM_BY_ID:
      return {
        ...state,
        serviceRoomId: action.payload
      }
    case CLEAR_SERVICE_ROOM_BY_ID:
      return {
        ...state,
        serviceRoomId: {}
      }

    default:
      return { ...state }
  }
}

export default rooms_reducer;