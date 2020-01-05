import {put} from 'redux-saga/effects'
import * as actions from '../Action/Index'
import axios from 'axios'

export function* initingredientSaga(){
   
    try{
        const response=yield axios.get("https://burger-app-b8472.firebaseio.com/Ingredients.json");
        yield put(actions.saveingredient(response.data));
    }
    catch(error){
        yield put(actions.fetchingredientfailure())
    }

    
}