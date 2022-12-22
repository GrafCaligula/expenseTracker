import React from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { expActions } from '../../../store/expenses-slice';

import Card from '../Card';
import classes from './ErrorOverlay.module.css';

const ErrorOverlay = () => {
  // Hooks
  const dispatch = useDispatch();
  const inputError = useSelector((state) => state.expenses.inputError);

  const closeOverlayHandler = () => {
    dispatch(expActions.clearError());
  };

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{inputError.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{inputError.message}</p>
      </div>
      <footer className={classes.actions}>
        <button onClick={closeOverlayHandler}>O.K.</button>
      </footer>
    </Card>
  );
};

export default ErrorOverlay;
