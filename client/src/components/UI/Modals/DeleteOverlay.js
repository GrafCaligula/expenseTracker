import React from 'react';

import { useDispatch } from 'react-redux';
import { expActions } from '../../../store/expenses-slice';

import Card from '../Card';
import classes from './DeleteOverlay.module.css';

const DeleteOverlay = () => {
  const dispatch = useDispatch();

  const onConfirm = () => {
    dispatch(expActions.deleteExpense());
  };

  const onAbort = () => {
    dispatch(expActions.toggleDeleteModal());
  };

  // Variables
  const title = 'Achtung !';
  const message = 'Soll die Ausgabe wirklich gelöscht werden?';

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        <p>{message}</p>
      </div>
      <footer className={classes.actions}>
        <button onClick={onConfirm}>Ja</button>
        <button onClick={onAbort}>Nein</button>
      </footer>
    </Card>
  );
};

export default DeleteOverlay;
