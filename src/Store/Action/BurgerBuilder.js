import * as actiontypes from "./Actiontype";
// import axios from "../../axios-orders";


export const addingredient = data => {
  return {
    type: actiontypes.ADD_INGREDIENT,
    ingredientName: data
  };
};

export const removeingredient = data => {
  return {
    type: actiontypes.REMOVE_INGREDIENT,
    ingredientName: data
  };
};

export const saveingredient=(ingredient)=>{
    return{
        type:actiontypes.SET_INGREDIENT,
        ingredients:ingredient
    }

}

export const fetchingredientfailure=()=>{
    return{
        type:actiontypes.FETCH_INGREDIENTFAILURE
    }
     
}

export const initingredient = () => {
    // return dispatch=>{
    //     axios
    //   .get("https://burger-app-b8472.firebaseio.com/Ingredients.json")
    //   .then(response =>{dispatch(saveingredient(response.data))})
    //   .catch(error=>dispatch(fetchingredientfailure()));
    // };

    return{
      type:actiontypes.INIT_INGREDIENT_INITIATE
    }
  };

 