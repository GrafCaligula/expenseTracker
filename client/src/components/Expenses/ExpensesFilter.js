import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { expActions } from '../../store/expenses-slice';

import classes from './ExpensesFilter.module.css';

const ExpensesFilter = () => {
  // Hooks
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const filteredYear = useSelector((state) => state.expenses.filteredYear);

  // Event Handler
  const filterChangeHandler = (event) => {
    dispatch(expActions.filterChange(event.target.value));

    
  };
  // Variables
  let filterYears = [];
  if (expenses) {
    filterYears = [
      ...new Set(
        expenses.map((expense) => new Date(expense.date).getFullYear())
      ),
    ].sort((a, b) => b - a);
  }

  const filters = filterYears.map((year) => (
    <option value={year} key={year}>
      {year}
    </option>
  ));

  return (
    <div className={classes['expenses-filter']}>
      <div className={classes['expenses-filter__control']}>
        <label>Filter:</label>
        <select value={filteredYear} onChange={filterChangeHandler}>
          <option value="">Kein Filter...</option>
          {filters}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
