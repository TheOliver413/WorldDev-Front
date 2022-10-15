import {
  SET_ACTUAL_PAGE,
  SET_MIN_PAGE_NUMBER,
  SET_MAX_PAGE_NUMBER,
} from "../action/action";

const initialStateHotel = {
  actualPage: 1,
  //min y max son para hacer el paginado más tikito y que quede lindo, uso ambos para hacer un slice y renderizar sólo ese pedazo
  minPageNumber: 0,
  maxPageNumber: 5,
};

const pagination_reducer = (state = initialStateHotel, action) => {
  switch (action.type) {
    case SET_ACTUAL_PAGE:
      return {
        ...state,
        actualPage: action.payload,
      };

    case SET_MIN_PAGE_NUMBER:
      return {
        ...state,
        minPageNumber: action.payload,
      };

    case SET_MAX_PAGE_NUMBER:
      return {
        ...state,
        maxPageNumber: action.payload,
      };

    default:
      return { ...state };
  }
};

export default pagination_reducer;
