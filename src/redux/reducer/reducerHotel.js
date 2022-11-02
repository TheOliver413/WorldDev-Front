import {
  GET_ALL_HOTELS,
  SEARCH_NAME_HOTEL,
  GET_HOTEL_DETAIL,
  CREATE_HOTELS,
  CREATE_ROOMS,
  FILTER_BY_CITY,
  ORDER_BY,
  CLEAR_DETAIL,
  GET_CATEGORY,
  POST_SERVICES_HOTEL,
  PUT_SERVICES_HOTEL,
  GET_ALL_SERVICES_HOTEL,
  GET_SERVICES_HOTEL,
  GET_SERVICE_BY_ID,
  POST_EVENT,
  PUT_EVENT,
  GET_ALL_EVENTS,
  GET_EVENT_BY_ID,
  GET_ALL_LOCATIONS,
  GET_STATES,
  GET_CITY,
  GET_DEPARTMENT,
  FILTER_EVENT_BY_DATE,
  CLEAR_SERVICE_ID,
  CLEAR_EVENT_BY_ID,
  FILTER_HOTEL_BY_CATEGORY,

} from '../action/action';

const initialStateHotel = {
  hotels: [],
  allHotels: [],
  copy_hotels:[],
  detailHotel: {},
  servicesHotel: [],
  onlyServicesHotel: [],
  serviceId:{},
  location: [],
  filterCategory: [],
  allEvents: [],
  copy_allEvents:[],
  eventId:{},
  location_state:[],
  location_city:[],
  location_department:[],
  filterEventBydate:[],
};

const hotels_reducer = (state = initialStateHotel, action) => {
  switch (action.type) {
    case GET_ALL_HOTELS:
      return {
        ...state,
        hotels: action.payload,
        allHotels: action.payload,
        copy_hotels:action.payload,
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
    
    case GET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
        copy_allEvents: action.payload
      } 
    case GET_STATES:
        return {
          ...state,
          location_state: action.payload
        }
    case GET_CITY:
          return {
            ...state,
            location_city: action.payload
          } 
    case GET_DEPARTMENT:
            return {
              ...state,
              location_department: action.payload
            }
    case GET_SERVICE_BY_ID:
      return {
        ...state,
        serviceId: action.payload
      }
    case GET_EVENT_BY_ID:
      return {
        ...state,
        eventId: action.payload
      }
    case FILTER_EVENT_BY_DATE:

      state.allEvents = state.copy_allEvents;
      
      if( action.payload ){
        var b =  state.allEvents?.filter( e => e.date.includes( action.payload) )
      }else{
        var b = state.allEvents
      }
      return {
        ...state,
        allEvents: b
      }
    
    case CLEAR_SERVICE_ID: 
      return {
        ...state,
        serviceId: {}
      };

    case CLEAR_EVENT_BY_ID: 
      return {
        ...state,
        eventId: {}
      };
    case FILTER_HOTEL_BY_CATEGORY:

      // state.hotels = state.copy_hotels;
      state.copy_hotels = state.hotels

      console.log("info en reducer: ",action.payload)
      if( action.payload ){ 
        var filt_hotel_category = state.copy_hotels?.filter(e=>e.qualification == action.payload)}
        else{
          var filt_hotel_category = state.hotels
        }
      
      return {
        ...state,
        hotels: filt_hotel_category
      };
    default:
      return { ...state }
  }
}



export default hotels_reducer;