import React from "react";
import classes from "./BurgerControls.css";
import BuildControl from "./BurgerControl/BurgerControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price:{props.price.toFixed(2)}</p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          addingredient={props.addingIngredient.bind(this, ctrl.type)}
          removeingredient={props.removingIngredientHandler.bind(
            this,
            ctrl.type
          )}
          disabled={props.disabledInfo[ctrl.type]}
        >
        </BuildControl>
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.orderClick}
      >
        {props.isAuthenticated?"order Now":"SignUp To Order"}
      </button>
    </div>
  );
};

export default BuildControls;
