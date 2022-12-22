import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { expActions } from '../../store/expenses-slice';

import ExpenseForm from './ExpenseForm';
import Card from '../UI/Card';
import classes from './NewExpense.module.css';

/**
 * Component to render a Expense form
 * @Component
 */
const NewExpense = () => {
  // Hooks
  const dispatch = useDispatch();
  const showExpenseForm = useSelector(
    (state) => state.expenses.showExpenseForm
  );

  // Event Handlers
  /**
   * dispatches action to toggle the "New Expenses" Form
   * @param {Object} event Click event 
   */
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
