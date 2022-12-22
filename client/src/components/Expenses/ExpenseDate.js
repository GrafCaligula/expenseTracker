import React from "react";

import classes from "./ExpenseDate.module.css";

const ExpenseDate = (props) => {
  const month = props.date.toLocaleString("de-DE", { month: "long" });
  const year = props.date.toLocaleString("de-DE", { year: "numeric" });
  const day = props.date.toLocaleString("de-DE", { day: "2-digit" });
  return (
    <div className={classes["expense-date"]}>
      <div className={classes["expense-date__month"]} >{month}</div>
      <div className={classes["expense-date__year"]} >{year}</div>
      <div className={classes["expense-date__day"]} >{day}</div>
    </div>
  );
};

export default ExpenseDate;
