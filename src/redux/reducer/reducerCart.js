import { ADD_ROOM_TO_CART } from "../action/action";
import { toast } from "react-toastify";

const initialState = {
  cartTotalQuantity: 0,
  cartRooms: []
};

const cart_reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM_TO_CART:
      const indexOfroom = state.cartRooms.findIndex(r => r.id === action.payload.id)
      //nota: cartQuantity es como el stock q quiero llevar(?)
      //si no tengo esta room agregada al carrito => la agrego, sino => aumento su cartQuantity
      if (indexOfroom < 0) {
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-right",
        });
        return {
          ...state,
          cartTotalQuantity: state.cartTotalQuantity += 1,
          cartRooms: [...state.cartRooms, {...action.payload, cartQuantity: 1}]
        }
      } else {
        state.cartRooms[indexOfroom].cartQuantity += 1
        toast.info(`Number of room ${state.cartRooms[indexOfroom].name} updated to ${state.cartRooms[indexOfroom].cartQuantity}`, {
          position: 'bottom-right'
        });
        return {
          ...state
        }
      }

    default:
      return { ...state };
  }
};

export default cart_reducer;
