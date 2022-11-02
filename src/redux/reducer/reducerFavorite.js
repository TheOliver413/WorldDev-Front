import {
  ADD_ROOM_TO_FAVORITES,
  GET_FAVORITES,
  GET_FAVORITES_ID,
  REMOVE_ROOM_FROM_FAVORITES,
  CLEAN_FAVORITE
} from "../action/favoriteAction.js";

const initialStateHotel = {
  favorites: [],
  IDs: [],
};

const favorite_reducer = (state = initialStateHotel, action) => {
  switch (action.type) {
    case ADD_ROOM_TO_FAVORITES:
      return {
        ...state,
      };

    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };

    case GET_FAVORITES_ID:
      return {
        ...state,
        IDs: action.payload,
      };

    case REMOVE_ROOM_FROM_FAVORITES:
      return {
        ...state,
      };
    case CLEAN_FAVORITE:
      return {
        ...state,
        favorites: []
      }

    default:
      return { ...state };
  }
};

export default favorite_reducer;
