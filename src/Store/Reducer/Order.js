import * as actionType from "../Action/Actiontype";

const initialState = {
  order: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionType.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionType.PURCHASE_BURGER_SUCCESS:
      const neworder = {
        orderId: action.orderId,
        orderData: action.orderData
      };
      return {
        ...state,
        loading: false,
        order: state.order.concat(neworder),
        purchased: true
      };
    case actionType.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionType.ORDER_FETCH_START:
      return {
        ...state,
        loading:true
      };
    case actionType.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        loading:false,
        order:action.orders
      };
    case actionType.ORDER_FETCH_FAIL:
      return {
        ...state,
        loading:false
      };
    default:
      return state;
  }
};

export default reducer;
