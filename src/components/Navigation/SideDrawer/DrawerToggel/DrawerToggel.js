import React from "react";
import classes from './DrawerToggel.css'

const DrawerToggel = props => {
  return <div className={classes.DrawerToggel} onClick={props.clicked}>
  <div></div>
  <div></div>
  <div></div>
  </div>
};

export default DrawerToggel;
