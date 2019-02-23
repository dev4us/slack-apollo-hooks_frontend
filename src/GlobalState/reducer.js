export const initialState = {
  selectedChannelId: 1
};

const reducer = (state, action) => {
  const reduced = { ...state };

  switch (action.type) {
    case "SWITCHING_CHANNEL":
      return {
        ...reduced,
        selectedChannelId: action.payload
      };
    case "RESET_DATA":
      return initialState;
    default:
      return state;
  }
};
export default reducer;
