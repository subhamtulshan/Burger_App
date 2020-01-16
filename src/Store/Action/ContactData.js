import * as actiontypes from "./Actiontype";

export const mapShow = () => {
  return {
    type: actiontypes.SHOW_MAP,
  };
};

export const mapSave = (selectedplace) => {
  return {
    type: actiontypes.SAVE_MAP,
    place:selectedplace
  };
};


export const mapClose=()=>
{
    return{
        type:actiontypes.CLOSE_MAP       
    }
}