const initialState = {
  roomsSelected: 0,
};

const cart_reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOMS_SELECTED':
      return {
        ...state,
        roomsSelected: state.roomsSelected + 1,
      };

    default:
      return { ...state };
  }
};

export default cart_reducer;
