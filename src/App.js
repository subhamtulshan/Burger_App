import React, {Suspense, useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import SignUp from "./containers/Auth/SignUp/SignUp"
// import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, Redirect } from "react-router-dom";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import Spinner from "./components/UI/Spinner/Spinner";
import * as actions from "./Store/Action/Index";

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

const App = props => {
  useEffect(() => {
    props.isAutoLogin();
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Route
        path="/Auth"
        render={props => (
          <Suspense fallback={<Spinner></Spinner>}>
            <Auth {...props}></Auth>
          </Suspense>
        )}
      ></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route
          path="/Orders"
          render={props => (
            <Suspense fallback={<Spinner></Spinner>}>
              <Orders {...props}></Orders>
            </Suspense>
          )}
        ></Route>
        <Route
          path="/checkout"
          render={props => (
            <Suspense fallback={<Spinner></Spinner>}>
              <Checkout {...props}></Checkout>
            </Suspense>
          )}
        ></Route>
        <Route
          path="/Auth"
          render={props => (
            <Suspense fallback={<Spinner></Spinner>}>
              <Auth {...props}></Auth>
            </Suspense>
          )}
        ></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/logout" component={Logout}></Route>
      </Switch>
    );
  }
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStatetoProps = state => {
  return {
    isAuthenticated: state.AuthReducer.idtoken !== null
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    isAutoLogin: () => dispatch(actions.autoCheckStatus())
  };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(App);
