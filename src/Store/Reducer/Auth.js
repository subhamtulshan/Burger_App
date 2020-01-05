import * as actiontype from "../Action/Actiontype";

const initialState = {
  idtoken: null,
  error: null,
  loading: false,
  userId: null,
  AuthRedirect: "/"
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontype.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actiontype.AUTH_SUCCESS:
      return {
        ...state,
        idtoken: action.idtoken,
        userId: action.userId,
        loading: false,
        error: null
      };
    case actiontype.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actiontype.AUTH_LOGOUT:
      return {
        ...state,
        idtoken: null,
        userId: null
      };
    case actiontype.SET_AUTH_REDIRECT:
      return {
        ...state,
        AuthRedirect: action.path
      };
    default:
      return state;
  }
};

export default reducer;
