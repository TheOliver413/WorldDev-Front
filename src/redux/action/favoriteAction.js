import axios from "axios";
import { toast } from "react-toastify";

export const ADD_ROOM_TO_FAVORITES = "ADD_ROOM_TO_FAVORITES";
export const GET_FAVORITES = "GET_FAVORITES";
export const GET_FAVORITES_ID = "GET_FAVORITES_ID";
export const REMOVE_ROOM_FROM_FAVORITES = "REMOVE_ROOM_FROM_FAVORITES";
export const CLEAN_FAVORITE = "CLEAN_FAVORITE";


const BACK_URL = "https://worlddev-back-op5m.onrender.com";

export function addRoomToFavorites(payload, userId) {
  return async function (dispatch) {
    await axios.post(`${BACK_URL}/favorites`, {id: userId, favorites: [payload.id]})
    // await axios.post(`${BACK_URL}/favorites`, {
    //   id: "zO5A1bYsv2S3btXqqYw5t428rB13",
    //   favorites: [payload.id],
    // });
    dispatch({
      type: ADD_ROOM_TO_FAVORITES,
    });
    toast.success(`${payload.name} added to favorites`, {
      position: "bottom-right",
    });
  };
}

export function getFavorites(userId) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${BACK_URL}/favorites/${userId}`)
      // const res = await axios.get(
      //   `${BACK_URL}/favorites/zO5A1bYsv2S3btXqqYw5t428rB13`
      //);
      dispatch({
        type: GET_FAVORITES,
        payload: res.data,
      });
    } catch (e) {
      console.log('error getFavorites', e);
      dispatch({
        type: GET_FAVORITES,
        payload: e.response.data,
      });
    }
  };
}

export function getFavoritesID(userId) {
  return async function (dispatch) {
    const res = await axios.get(`${BACK_URL}/favorites/list/${userId}`)
    // const res = await axios.get(
    //   `${BACK_URL}/favorites/list/zO5A1bYsv2S3btXqqYw5t428rB13`
    // );
    // console.log('res.data',res.data);
    dispatch({
      type: GET_FAVORITES_ID,
      payload: res.data,
    });
  };
}

export function removeRoomFromFavorites(payload, userId) {
  return async function (dispatch) {
    try {
      await axios.delete(`${BACK_URL}/favorites`, {
        data: {
          id: userId,
          //id: "zO5A1bYsv2S3btXqqYw5t428rB13",
          favorite: payload.id,
        },
      });
      dispatch({
        type: REMOVE_ROOM_FROM_FAVORITES,
      });
      toast.error(`${payload.name} removed from favorites`, { position: "bottom-right" });
    } catch (e) {
      toast.error(`${e.response.data}`, { position: "bottom-right" });
    }
  };
}

export function cleanFavorite() {
  return {
    type: CLEAN_FAVORITE
  }
}
