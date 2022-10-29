export const PUT_USERS = "PUT_USERS";
export const POST_USERS = "POST_USERS";

const BACK_URL = "http://localhost:3001"


export function createUsers(payload) {
  return async function (dispatch) {
    try {
      const users = await axios.post(`${BACK_URL}/profileusers`, payload)
      dispatch({
        type: POST_USERS,
        payload
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function modifyUsers(payload) {
  return async function (dispatch) {
    try {
      const users = await axios.put(`${BACK_URL}/profileusers`, payload)
      dispatch({
        type: PUT_USERS,
        payload
      })
    } catch (error) {
      console.log(error)
    }
  }
}