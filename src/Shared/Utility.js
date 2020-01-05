export const UpdateObject=(oldObject,updatedObject)=>{
    return{
        ...oldObject,
        ...updatedObject
    }
}

export const checkValidity = (value, rules) => {
    let valid = true;
    if (rules.required) {
      valid = value.trim() !== "" && valid;
    }
    if (rules.minLength) {
      valid = value.length >= rules.minLength && valid;
    }
    if (rules.maxLength) {
      valid = value.length <= rules.maxLength && valid;
    }
    if (rules.isEmail) {
      const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      valid = pattern.test(value) && valid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      valid = pattern.test(value) && valid;
    }
    return valid;
  };