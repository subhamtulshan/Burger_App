import React, {useState } from "react";
import Aux from "../Auxillary/Auxillary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = props => {
  // state = {
  //   showSideDrawer: false
  // };

  const [sideDrawerVisible,SetsideDrawerVisible]=useState(false);

  const SideDrawerToggelHandler = () => {
    // this.setState(prevstate => {
    //   return { showSideDrawer: !prevstate.showSideDrawer };
    // });
    SetsideDrawerVisible(!sideDrawerVisible);
  };

  const SideDrawerCloseHandler = () => {
    // this.setState({ showSideDrawer: false });
      SetsideDrawerVisible(false);
  };

  return (
    <Aux>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        sideDrawerToggel={SideDrawerToggelHandler}
      ></Toolbar>
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        open={sideDrawerVisible}
        closed={SideDrawerCloseHandler}
      ></SideDrawer>
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
};

const mapStatetoProps = state => {
  return {
    isAuthenticated: state.AuthReducer.idtoken !== null
  };
};
export default connect(mapStatetoProps)(Layout);
