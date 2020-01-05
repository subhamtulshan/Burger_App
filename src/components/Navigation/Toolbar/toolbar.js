import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggel from "../SideDrawer/DrawerToggel/DrawerToggel";

const Toolbar = props => {
  return (
    <header className={classes.toolbar}>
      <DrawerToggel clicked={props.sideDrawerToggel}></DrawerToggel>
      <div className={classes.logo}>
        <Logo></Logo>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated}></NavigationItems>
      </nav>
    </header>
  );
};

export default Toolbar;
