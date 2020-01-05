import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import * as actions from "../Action/Index";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderdata
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderdata)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchorderSaga(action) {
  yield put(actions.orderFetchStart());
  const queryparam =
    "?auth=" +
    action.token +
    '&orderBy="UserId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("./orders.json" + queryparam);
    const fetchOrders = [];
    for (let key in response.data) {
      fetchOrders.push({ ...response.data[key], id: key });
    }
    yield put(actions.orderFetchSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.orderFetchFail());
  }
}
