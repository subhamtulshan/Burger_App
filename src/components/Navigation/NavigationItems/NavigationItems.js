import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./Navigationtem/NavigationItem";

const NavigationItems = props => {
  return (
    <ul className={classes.navigationItems}>
      <NavigationItem link="/" exact active={true}>
        Home
      </NavigationItem>
      {props.isAuthenticated?<NavigationItem link="/Orders">Orders</NavigationItem>:null}
      {props.isAuthenticated ? (
        <NavigationItem link="/logout">Logout</NavigationItem>
      ) : (
        <NavigationItem link="/Auth">Login</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
