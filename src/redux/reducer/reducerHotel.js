import {
  GET_ALL_HOTELS,
  SEARCH_NAME_HOTEL,
  GET_HOTEL_DETAIL,
  GET_ALL_SERVICES_HOTEL,
  CREATE_HOTELS,
  CREATE_ROOMS,
  GET_ALL_LOCATIONS,
  FILTER_BY_CITY,
  ORDER_BY,
  CLEAR_DETAIL,
  GET_CATEGORY,
  POST_SERVICES_HOTEL,
  PUT_SERVICES_HOTEL,
  POST_EVENT,
  PUT_EVENT,
  GET_SERVICES_HOTEL,
  GET_EVENTS_HOTEL,
} from '../action/action';

const initialStateHotel = {
  hotels: [],
  allHotels: [],
  detailHotel: {},
  servicesHotel: [],
  location: [],
  filterCategory: [],
  onlyServicesHotel: [],
  onlyEventsHotel: [],
};

const hotels_reducer = (state = initialStateHotel, action) => {
  switch (action.type) {
    case GET_ALL_HOTELS:
      return {
        ...state,
        hotels: action.payload,
        allHotels: action.payload
      }

    case SEARCH_NAME_HOTEL:
      // let hotelFound =typeof action.payload === 'object'? action.payload : state.allHotels
      return {
        ...state,
        hotels: action.payload
      }
    case GET_HOTEL_DETAIL:
      return {
        ...state,
        detailHotel: action.payload
      }

    case CLEAR_DETAIL:
      return {
        ...state,
        detailHotel: {}
      }

    case GET_ALL_SERVICES_HOTEL:
      return {
        ...state,
        servicesHotel: action.payload
      }

    case CREATE_HOTELS:
      return {
        ...state,
      }

    case CREATE_ROOMS:
      return {
        ...state,
      }

    case POST_SERVICES_HOTEL:
      return {
        ...state,
      }

    case PUT_SERVICES_HOTEL:
      return {
        ...state,
      }

    case POST_EVENT:
      return {
        ...state,
      }

    case PUT_EVENT:
      return {
        ...state,
      }

    case GET_ALL_LOCATIONS:
      return {
        ...state,
        location: action.payload
      }

    case FILTER_BY_CITY:
      return {
        ...state,
        hotels: action.payload
      }

    case ORDER_BY:
      let aux = [...state.hotels];
      let order = [];
      console.log(aux)
      switch (action.payload) {
        case 'all':
          order = [...state.allHotels];
          break;
        case 'A-Z':
          order = aux.sort(function (a, b) {
            if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
            if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
            return 0;
          })
          break;
        case 'Z-A':
          order = aux.sort(function (a, b) {
            if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
            if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
            return 0;
          })
          break;
        default:
          order = aux
          break;
      }

      return {
        ...state,
        hotels: order
      }
    case GET_CATEGORY:
      let auxCat = [...state.hotels]
      let filtCat = []
      switch (action.payload) {
        case "":
          filtCat = [...state.allHotels]
          break;
        case 'qualification asc':
          filtCat = auxCat.sort(function (a, b) {
            return a.qualification - b.qualification
          });
          break;
        case 'qualification desc':
          filtCat = auxCat.sort(function (a, b) {
            return b.qualification - a.qualification
          });
          break;
        default:
          filtCat = auxCat
          break;
      }
      return {
        ...state,
        hotels: filtCat,
      }

    case GET_SERVICES_HOTEL:
      return {
        ...state,
        onlyServicesHotel: action.payload
      } 
    
    case GET_EVENTS_HOTEL:
      return {
        ...state,
        onlyEventsHotel: action.payload
      }  

    default:
      return { ...state }
  }
}


export default hotels_reducer;