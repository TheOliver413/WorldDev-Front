import { ADD_ROOM_TO_CART, REMOVE_ROOM_FROM_CART, GET_TOTALS, DECREASE_CART, CLEAR_CART } from "../action/cartAction";
import { toast } from "react-toastify";

const initialState = {
  cartRooms: localStorage.getItem('cartRooms')
    ? JSON.parse(localStorage.getItem('cartRooms'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const cart_reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM_TO_CART:
      const indexOfroom = state.cartRooms.findIndex(r => r.id === action.payload.id)
      //nota: cartQuantity es como el stock q quiero llevar(?)
      //si no tengo esta room agregada al carrito => la agrego, sino => aumento su cartQuantity
      if (indexOfroom < 0) {
        toast.success(`${action.payload.name} added to cart`, { position: "bottom-right" });
        localStorage.setItem('cartRooms', JSON.stringify([...state.cartRooms, {...action.payload, cartQuantity: 1}]))
        return {
          ...state,
          cartTotalQuantity: state.cartTotalQuantity += 1,
          cartRooms: [...state.cartRooms, {...action.payload, cartQuantity: 1}]
        }
      } else {
        state.cartRooms[indexOfroom].cartQuantity += 1
        toast.info(`Increased ${state.cartRooms[indexOfroom].name} cart quantity to ${state.cartRooms[indexOfroom].cartQuantity}`, { position: 'bottom-right' });
        localStorage.setItem('cartRooms', JSON.stringify(state.cartRooms))
        return {
          ...state,
          cartTotalQuantity: state.cartTotalQuantity += 1,
          cartTotalAmount: state.cartTotalAmount += action.payload.price
        }
      };

    case REMOVE_ROOM_FROM_CART:
      const filteredCartRooms = state.cartRooms.filter(r => r.id !== action.payload.id)
      localStorage.setItem('cartRooms', JSON.stringify(filteredCartRooms))
      toast.error(`Room ${action.payload.name} removed from cart`, { position: 'bottom-right' });
      return {
        ...state,
        cartRooms: filteredCartRooms,
        cartTotalQuantity: state.cartTotalQuantity -= action.payload.cartQuantity,
        cartTotalAmount: state.cartTotalAmount -= action.payload.totalPrice
      };

    case GET_TOTALS:
      const {total, quantity} = state.cartRooms.reduce(
        (cartTotal, cartRoom) => {
          const { totalPrice, cartQuantity } = cartRoom
          const itemTotal = totalPrice * cartQuantity

          cartTotal.total += itemTotal
          cartTotal.quantity += cartQuantity

          return cartTotal
      },
      {
        total: 0,
        quantity: 0
      })

      return {
        ...state,
        cartTotalQuantity: quantity,
        cartTotalAmount: total
      };

    case DECREASE_CART: 
      const indexDecreaseRoom = state.cartRooms.findIndex(r => r.id === action.payload.id)
      if (state.cartRooms[indexDecreaseRoom].cartQuantity > 1) {
        state.cartRooms[indexDecreaseRoom].cartQuantity -= 1
        toast.info(`Decreased ${state.cartRooms[indexDecreaseRoom].name} cart quantity`, { position: 'bottom-right' });
        localStorage.setItem('cartRooms', JSON.stringify(state.cartRooms))
        return {
          ...state,
          cartTotalQuantity: state.cartTotalQuantity -= 1,
          cartTotalAmount: state.cartTotalAmount -= action.payload.price
        }
      } else {
        const filteredCartRooms = state.cartRooms.filter(r => r.id !== action.payload.id)
        toast.error(`Room ${action.payload.name} removed from cart`, { position: 'bottom-right' });  
        localStorage.setItem('cartRooms', JSON.stringify(filteredCartRooms))
        return {
          ...state,
          cartRooms: filteredCartRooms,
          cartTotalQuantity: state.cartTotalQuantity -= action.payload.cartQuantity,
          cartTotalAmount: state.cartTotalAmount -= action.payload.totalPrice
        }
      };

    case CLEAR_CART:
      localStorage.setItem('cartRooms', JSON.stringify([]))
      toast.error(`Cart cleared`, { position: 'bottom-right' });
      return {
        cartRooms: [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0
      };

    default:
      return { ...state };
  }
};

export default cart_reducer;
