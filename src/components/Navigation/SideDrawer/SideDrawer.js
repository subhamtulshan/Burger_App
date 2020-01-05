import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxillary/Auxillary";

const SideDrawer = props => {
  let attachedclass = [classes.SideDrawer, classes.close];

  if (props.open) attachedclass = [classes.SideDrawer, classes.open];

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed}></BackDrop>
      <div className={attachedclass.join(" ")} onClick={props.closed}>
        <div className={classes.logo}>
          <Logo></Logo>
        </div>
        <nav>
          <NavigationItems
            isAuthenticated={props.isAuthenticated}
          ></NavigationItems>
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
