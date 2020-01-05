import React from "react";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredients = Object.keys(props.ingredients).map(igkeys => {
    return (
      <li key={igkeys}>
        {igkeys}:{props.ingredients[igkeys]}
      </li>
    );
  });

  return (
    <Aux>
      <p>Your Order</p>
      <p>Your Burger has the following ingredients:</p>
      <ul>{ingredients}</ul>
      <p>Total price:{props.price}</p>
      <p>want to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.pruchasecontinued}>
        Success
      </Button>
    </Aux>
  );
};

export default OrderSummary;
