import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../Action/Actiontype";

import { checkAuthTimeoutSaga, authUserSaga, checkEmailsaga } from "../Sagas/Auth";
import { initingredientSaga } from "../Sagas/BurgerBuilder";
import { purchaseBurgerSaga, fetchorderSaga } from "../Sagas/Order";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.CHECK_EMAIL, checkEmailsaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENT_INITIATE, initingredientSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER_INITIATE, purchaseBurgerSaga);
  yield takeEvery(actionTypes.ORDER_FETCH_INITIATE, fetchorderSaga);
}
