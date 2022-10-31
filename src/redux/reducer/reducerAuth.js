import { POST_USERS, PUT_USERS, GET_DETAIL_USER, GET_ALL_USERS, GET_ALL_ADMINS, GET_BLOCKED} from '../action/actionAuth.js'

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
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    case GET_ALL_ADMINS:
      return {
        ...state,
        allAdmins: action.payload
      } 
    case GET_BLOCKED:
      return {
        ...state,
      } 
    default:
      return { ...state }
  }
};

export default reducer_auth;