import reducerHotel from "../reducer/reducerHotel.js";
import reducerRoom from "../reducer/reducerRoom.js";
import reducerPagination from "../reducer/reducerPagination.js";
import reducerCart from "../reducer/reducerCart.js";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const combineReducers = require("redux").combineReducers;

const rootReducers = combineReducers({
  reducerHotel,
  reducerRoom,
  reducerPagination,
  reducerCart,
});

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
