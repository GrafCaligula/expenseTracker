import React from 'react';

import { useSelector } from 'react-redux';

import Chart from '../Chart/Chart';

const ExpensesChart = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const filteredYear = useSelector((state) => state.expenses.filteredYear);

  let filteredExpenses = [];

  if (expenses) {
    // Filtering Elements
    filteredExpenses = expenses.filter((expense) => {
      if (filteredYear === '') {
        return true;
      } else {
        return new Date(expense.date).getFullYear().toString() === filteredYear;
      }
    });
  }

  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mär', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'Mai', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Okt', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dez', value: 0 },
  ];
  if (filteredExpenses) {
    for (const expense of filteredExpenses) {
      const expenseMonth = new Date(expense.date).getMonth();
      chartDataPoints[expenseMonth].value += expense.amount;
    }
  }

  return <Chart dataPoints={chartDataPoints} />;
};

export default ExpensesChart;
