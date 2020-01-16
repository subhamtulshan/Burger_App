import * as actionType from "../Action/Actiontype";
// import axios from "../../axios-orders";

export const purchaseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_BURGER_START
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerSuccess = (id, orderdata) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    OrderId: id,
    OrderData: orderdata
  };
};

export const purchaseBurger = (orderdata, token) => {
  // return dispatch => {
  //     dispatch(purchaseBurgerStart())
  //   axios
  //     .post("/orders.json?auth="+token, orderdata)
  //     .then(response => {
  //       dispatch(purchaseBurgerSuccess(response.data.name, orderdata));
  //     })
  //     .catch(error => {
  //       dispatch(purchaseBurgerFail(error));
  //     });
  // };

  return {
    type: actionType.PURCHASE_BURGER_INITIATE,
    orderdata: orderdata,
    token: token
  };
};

export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT
  };
};

export const orderFetchStart = () => {
  return {
    type: actionType.ORDER_FETCH_START
  };
};

export const orderFetchSuccess = orders => {
  return {
    type: actionType.ORDER_FETCH_SUCCESS,
    orders: orders
  };
};

export const orderFetchFail = () => {
  return {
    type: actionType.ORDER_FETCH_FAIL
  };
};

export const fetchorder = (token, userId) => {
  // return dispatch => {
  //     dispatch(orderFetchStart());
  //     const queryparam ='?auth='+token+'&orderBy="UserId"&equalTo="'+userId+'"';
  //   axios
  //     .get("./orders.json"+queryparam)
  //     .then(result => {
  //       const fetchOrders = [];
  //       for (let key in result.data) {
  //         fetchOrders.push({ ...result.data[key], id: key });
  //       }
  //       dispatch(orderFetchSuccess(fetchOrders));
  //     })
  //     .catch(err => {
  //         dispatch(orderFetchFail())
  //     });
  return{
    type:actionType.ORDER_FETCH_INITIATE,
    token:token,
    userId:userId
  }
};
