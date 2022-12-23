import React from 'react';

import { useDispatch } from 'react-redux';
import { expActions } from '../../store/expenses-slice';

import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';

import { FaRegTrashAlt } from 'react-icons/fa';
import classes from './ExpenseItem.module.css';

const ExpenseItem = (props) => {
  //Hooks
  const dispatch = useDispatch();

  //EventHandlers
  const deleteExpenseHandler = (event) => {
    dispatch(expActions.toggleDeleteModal(props.id));
  };

  return (
    <ul className={classes['expense-item__list']}>
      <Card className={classes['expense-item']}>
        <ExpenseDate date={props.date} />
        <div className={classes['expense-item__description']}>
          <h2>{props.title}</h2>
          <div className={classes['expense-item__price']}>
            {props.amount + ' €'}
          </div>
          <button className={classes.button} onClick={deleteExpenseHandler}>
            <FaRegTrashAlt className={classes.trashIcon} />
          </button>
        </div>
      </Card>
    </ul>
  );
};


export default ExpenseItem;
