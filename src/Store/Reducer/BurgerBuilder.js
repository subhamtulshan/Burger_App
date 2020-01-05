import * as actiontypes from "../Action/Actiontype";

const initialstate = {
  ingredients: null,
  price: 4,
  error: false,
  building: false
};

const Ingredient_price = {
  salad: 0.6,
  cheese: 0.4,
  meat: 1,
  bacon: 0.8
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actiontypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        price: state.price + Ingredient_price[action.ingredientName],
        building:true
      };
    case actiontypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        price: state.price - Ingredient_price[action.ingredientName],
        building:true
      };
    case actiontypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        price: 4,
        building:false
      };
    case actiontypes.FETCH_INGREDIENTFAILURE:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default reducer;
