import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { expActions } from '../../store/expenses-slice';

import Axios from 'axios';

import ExpenseItem from './ExpenseItem';
import classes from './ExpensesList.module.css';

const ExpensesList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const filteredYear = useSelector((state) => state.expenses.filteredYear);

  useEffect(() => {
    console.log('fetching...');
    const url = 'http://localhost:3001/fetch';
    Axios.get(url).then((response) => {
      dispatch(expActions.setExpenses(response.data));
    });
  }, [expenses.length, dispatch]);

  let filteredExpenses = [];
  let sortedAndFilteredExpenses = [];

  if (expenses) {
    // Filtering Elements
    filteredExpenses = expenses.filter((expense) => {
      if (filteredYear === '') {
        return true;
      } else {
        return new Date(expense.date).getFullYear().toString() === filteredYear;
      }
    });
    // Sorting Expenses
    sortedAndFilteredExpenses = filteredExpenses.sort((a, b) => {
      return Date.parse(new Date(b.date)) - Date.parse(new Date(a.date));
    });
  }

  if (sortedAndFilteredExpenses.length === 0) {
    return (
      <h2 className={classes['expenses-list__fallback']}>
        Keine Ausgaben gefunden
      </h2>
    );
  }

  return (
    <ul className={classes['expenses-list']}>
      {sortedAndFilteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={new Date(expense.date)}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
