import { POST_USERS, PUT_USERS } from '../action/actionAuth.js'

const initialStateAuth = {
  users: {}
}

const reducer_auth = (state = initialStateAuth, action) => {
  switch (action.payload) {
    case POST_USERS:
      return {
        ...state
      }
      break;
    case PUT_USERS:
      return {
        ...state
      }
      break;
    default:
      return { ...state }
      break;
  }
};

export default reducer_auth;