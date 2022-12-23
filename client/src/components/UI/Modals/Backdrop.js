import React from 'react';

import { useDispatch } from 'react-redux';
import { expActions } from '../../../store/expenses-slice';

import classes from './Backdrop.module.css';

const Backdrop = () => {

  const dispatch = useDispatch();

  const closeBackdropHandler = () => {
    dispatch(expActions.toggleBackdrop());
    dispatch(expActions.clearError());
  };

  return <div className={classes.backdrop} onClick={closeBackdropHandler} />;
};

export default Backdrop;
