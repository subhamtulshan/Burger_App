import React, {  useEffect } from "react";
import * as actions from "../../../Store/Action/Index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Logout = props => {
  // componentDidMount() {
  //   this.props.onlogout();
  // }

  useEffect(() => {
    props.onlogout();
  }, []);
  return <Redirect to="/Auth"></Redirect>;
};
const mapDispatchtoProps = dispatch => {
  return {
    onlogout: () => {
      dispatch(actions.authLogout());
    }
  };
};
export default connect(null, mapDispatchtoProps)(Logout);
