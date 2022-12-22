import React, { Fragment } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { expActions } from '../../store/expenses-slice';

import { nanoid } from 'nanoid';

import Input from '../UI/Input';
import ErrorModal from '../UI/ErrorModal';

import classes from './ExpenseForm.module.css';

const ExpenseForm = () => {
  // Hooks
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state.expenses.userInput);
  const inputError = useSelector((state) => state.expenses.inputError);

  //Event Handlers
  const titleChangeHandler = (event) => {
    dispatch(expActions.titleChange(event.target.value));
  };
  const amountChangeHandler = (event) => {
    dispatch(expActions.amountChange(event.target.value));
  };
  const dateChangeHandler = (event) => {
    dispatch(expActions.dateChange(event.target.value));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // Wenn Eingaben da sind, baue ein Expense-Objekt
    if (userInput.enteredTitle && userInput.enteredAmount) {
      const expenseData = {
        id: nanoid(),
        title: userInput.enteredTitle,
        amount: +userInput.enteredAmount,
        date: userInput.enteredDate,
      };
      dispatch(expActions.addExpense(expenseData));
      dispatch(expActions.resetUserInput());
    } else {
      if (userInput.enteredTitle.trim().length === 0) {
        dispatch(
          expActions.setError({
            title: 'Ungültige Ausgabe',
            message: 'Bitte einen gültigen Titel eingeben',
          })
        );
      }
      if (
        userInput.enteredAmount.trim().length === 0 ||
        +userInput.enteredAmount < 0
      ) {
        dispatch(
          expActions.setError({
            title: 'Ungültige Kosten',
            message: 'Bitte gültige Kosten eingeben (größer als 0)',
          })
        );
      }
    }
  };

  const abortHandler = () => {
    dispatch(expActions.toggleExpenseForm());
  };

  return (
    <Fragment>
      {inputError && <ErrorModal />}
      <form onSubmit={submitHandler}>
        <div className={classes['new-expense__controls']}>
          <Input
            type="text"
            id="title"
            classes={classes['new-expense__control']}
            onChangeHandler={titleChangeHandler}
            value={userInput.enteredTitle}
            label="Ausgabe"
          />
          <Input
            type="number"
            id="amount"
            classes={classes['new-expense__control']}
            onChangeHandler={amountChangeHandler}
            value={userInput.enteredAmount}
            label="Kosten"
            min="0.01"
            step="0.01"
          />
          <Input
            type="date"
            id="date"
            classes={classes['new-expense__control']}
            onChangeHandler={dateChangeHandler}
            value={userInput.enteredDate}
            label="Datum"
          />
        </div>
        <div className={classes['new-expense__actions']}>
          <button type="submit">Ausgabe hinzufügen</button>
          <button onClick={abortHandler}>Abbrechen</button>
        </div>
      </form>
    </Fragment>
  );
};

export default ExpenseForm;
