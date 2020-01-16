import * as actiontypes from "../Action/Actiontype";

const initialState = {
  Visible: false,
  selectedplace: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.SHOW_MAP:
      return {
        ...state,
        Visible: true
      };
    case actiontypes.SAVE_MAP:
      return {
        ...state,
        Visible: false,
        selectedplace: action.place
      };
    case actiontypes.CLOSE_MAP:
      return {
        ...state,
        Visible: false,
        selectedplace:""
      };
    default:
      return state;
  }
};

export default reducer;
