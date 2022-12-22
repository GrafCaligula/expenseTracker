import React, { Fragment } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { expActions } from '../../store/expenses-slice';

import ExpenseForm from './ExpenseForm';
import Card from '../UI/Card';
import classes from './NewExpense.module.css';

const NewExpense = () => {
  // Hooks
  const dispatch = useDispatch();
  const showExpenseForm = useSelector(
    (state) => state.expenses.showExpenseForm
  );

  // Event Handlers
  const showFormHandler = (event) => {
    event.preventDefault();
    dispatch(expActions.toggleExpenseForm());
  };
  
  return (
    <Card className={classes['new-expense']}>
      {!showExpenseForm && (
        <button onClick={showFormHandler}>Neue Ausgabe hinzufügen</button>
      )}
      {showExpenseForm && <ExpenseForm />}
    </Card>
  );
};

export default NewExpense;
