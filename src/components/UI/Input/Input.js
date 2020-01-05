import React from "react";
import classes from "./Input.css";

const Input = props => {
  let input = null;
  let label=null;
  let inputClass = [classes.inputelement];
  if (!props.valid && props.touched) {
    inputClass.push(classes.invalid);
    label=<label className={classes.errorlabel}>{props.message}</label>
  }

  switch (props.elementtype) {
    case "input":
      input = (
        <input
          className={inputClass.join(" ")}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        ></input>
      );
      break;
    case "textarea":
      input = (
        <textarea
          className={classes.inputelement}
          {...props.elementconfig}
          onChange={props.changed}
        ></textarea>
      );
      break;
    case "select":
      input = (
        <select
          className={classes.inputelement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementconfig.options.map(option => (
            <option value={option.value}>{option.display}</option>
          ))}
        </select>
      );
      break;
    default:
      input = (
        <input
          className={classes.inputelement}
          {...props.elementconfig}
          onChange={props.changed}
        ></input>
      );
  }

  return (
    <div className={classes.input}>
      <label className={classes.label}></label>
      {input}
      {label}
    </div>
  );
};

export default Input;
