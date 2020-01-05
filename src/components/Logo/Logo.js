import React from "react";
import BurgerLogo from "../../assests/Images/burger-logo.png";
import classes from "./Logo.css";
// import { Redirect } from "react-router-dom";

const Logo = props => {
  return (
    <div className={classes.logo}>
      <a href='/'>
        <img  src={BurgerLogo} alt="My burger"></img>
      </a>
    </div>
  );
};

export default Logo;
