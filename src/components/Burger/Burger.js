import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";
import classes from "./Burger.css";

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKeys => {
      return [...Array(props.ingredients[igKeys])].map((_, i) => {
        return (
          <BurgerIngredient key={igKeys + i} type={igKeys}></BurgerIngredient>
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0)
    transformedIngredients = <p>please add some ingredient</p>;

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default Burger;
