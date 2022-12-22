import React, { useState, useEffect, useCallback } from 'react';

import expensesData from "../OLDdata";

const ExpContext = React.createContext({
  expenses: [],
  curentExpense: '',
  showConfirmModal: false,
  onFetchExpenses: () => {},
  onDeleteExpense: (expenseID) => {},
  onAddExpense: (expense) => {},
  // onAbort: () => {},
  onConfirm: () => {},
});

export const ExpContextProvider = (props) => {
  // Hooks
  const [expenses, setExpenses] = useState([...expensesData]);
  // const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const fetchExpensesHandler = useCallback(async () => {

    const response = await fetch(
      'https://react-http-20329-default-rtdb.europe-west1.firebasedatabase.app/Expenses.json'
    );
    const data = await response.json();
    let loadedExpenses = [];
    for (const key in data) {
      loadedExpenses.push({
        id: key,
        title: data[key].title,
        amount: data[key].amount,
        date: new Date(data[key].date),
      });
    }
    if (loadedExpenses.length > 0) {
      setExpenses([...loadedExpenses]);
    }
  }, []);

  useEffect(() => {
    fetchExpensesHandler();
  }, [fetchExpensesHandler]);

  const deleteExpenseHandler = (expenseID) => {
    setCurrentExpense(expenseID);
    setShowConfirmModal(true);
  };

  // const addExpenseHandler = (expense) => {
  //   setExpenses((prevState) => [expense, ...prevState]);
  //   UploadExpenses();
  // };
  const onConfirmHandler = () => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter(
        (expense) => expense.id !== currentExpense
      );
      setShowConfirmModal(false);
      return updatedExpenses;
    });
  };

  const UploadExpenses = useCallback(async () => {
    console.log(expenses);
    const url = 'https://react-http-20329-default-rtdb.europe-west1.firebasedatabase.app/Expenses.json';
    const requestSpecs = {
      method: 'POST',
      body: JSON.stringify(...expenses)

    }
    const response = await fetch(url, requestSpecs);
    const data = await response.json();
    console.log(data);

  }, [expenses]);

  useEffect(() => {
    UploadExpenses();
  }, [UploadExpenses]);

  return (
    <ExpContext.Provider
      value={{
        expenses: expenses,
        currentExpense: currentExpense,
        showConfirmModal: showConfirmModal,
        onFetchExpenses: fetchExpensesHandler,
        onDeleteExpense: deleteExpenseHandler,
        // onAddExpense: addExpenseHandler,
        // onAbort: onAbortHandler,
        onConfirm: onConfirmHandler,
      }}
    >
      {props.children}
    </ExpContext.Provider>
  );
};

export default ExpContext;
