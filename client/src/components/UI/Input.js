import React from "react";

import classes from "./Input.module.css";

/**
 * Custom Input Component
 * @Component 
 */
const Input = (props) => {
  return (
    <div className={classes["new-expense__control"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
      id={props.id}
        type={props.type}
        onChange={props.onChangeHandler}
        value={props.value}
      min={props.min}
      max={props.max}
      step={props.step}
      />
    </div>
  );
};

export default Input;
