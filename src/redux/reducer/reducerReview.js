import {
  POST_REVIEW_HOTEL_REQUEST,
  POST_REVIEW_HOTEL_SUCCESS,
  POST_REVIEW_HOTEL_FAIL,
} from "../action/reviewAction.js";

const initialState = {
  error: "",
  success: false,
  loading: false,
};

const reducerReview = (state = initialState, action) => {
  switch (action.type) {
    case POST_REVIEW_HOTEL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POST_REVIEW_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case POST_REVIEW_HOTEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducerReview;
