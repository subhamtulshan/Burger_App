import React from "react";
import classes from "./Order.css";

 const Order = props => {
  let Ingredients = [];

  for (let IngredientName in props.ingredients) {
    Ingredients.push({
      name: IngredientName,
      amount: props.ingredients[IngredientName]
    });
  }

  const ingredientOutput=Ingredients.map(ig=>{
    return <span style={{
      margin:'0 8px',
      display:'inline-block'
    }}key={ig.name}>{ig.name} {ig.amount}</span>
  })
  
  return (
    <div className={classes.order}>
      <h1>Order Details</h1>
      <p>Order ID:{props.id}</p>
      <p>Price:{props.price}</p>
      <p>Ingredients:{ingredientOutput}</p>
    </div>
  );
};

export default Order;
