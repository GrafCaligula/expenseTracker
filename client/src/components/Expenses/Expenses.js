import React from 'react';

import ExpensesFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';
import ExpensesList from './ExpensesList';
import Card from '../UI/Card';

import classes from './Expenses.module.css';

const Expenses = () => {
  
  return (
    <Card className={classes.expenses}>
      <ExpensesFilter />
      <ExpensesChart />
      <ExpensesList />
    </Card>
  );
};

export default Expenses;
