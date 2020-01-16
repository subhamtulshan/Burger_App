import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import BurgerbuilderReducer from "./Store/Reducer/BurgerBuilder";
import orderReducer from "./Store/Reducer/Order";
import thunk from "redux-thunk";
import AuthReducer from "./Store/Reducer/Auth";
import ContactReducer from "./Store/Reducer/ContactData"
import createsagaMiddleware from "redux-saga";
import { watchAuth, watchBurgerBuilder, watchOrder } from "./Store/Sagas";

const sagaMiddleware = createsagaMiddleware();
const roorReducer = combineReducers({
  BurgerbuilderReducer,
  orderReducer,
  AuthReducer,
  ContactReducer
});

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const store = createStore(
  roorReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
