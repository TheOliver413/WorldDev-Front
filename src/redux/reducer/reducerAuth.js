import { POST_USERS, PUT_USERS, GET_DETAIL_USER } from '../action/actionAuth.js'

const initialStateAuth = {
  users: {}
}

const reducer_auth = (state = initialStateAuth, action) => {
  switch (action.type) {
    case POST_USERS:
      return {
        ...state
      }
    case PUT_USERS:
      return {
        ...state
      }
    case GET_DETAIL_USER:
        return{
          ...state,
          users: action.payload
      } 
    default:
      return { ...state }
  }
};

export default reducer_auth;