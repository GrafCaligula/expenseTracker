import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

const today = new Date().toISOString().substring(0, 10);

const initialExpensesState = {
  expenses: [],
  filteredYear: '',
  currentExpense: '',
  showDeleteModal: false,
  showExpenseForm: false,
  userInput: {
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: today,
  },
  inputError: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: initialExpensesState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    addExpense(state, action) {
      //Posting to DB
      const url = 'http://localhost:3001/create';
      const body = {
        title: action.payload.title,
        amount: action.payload.amount,
        date: new Date(action.payload.date).toISOString().substring(0, 10),
      };
      Axios.post(url, body).then((response) => console.log(response.data));
      //Adding to state
      state.expenses = [action.payload, ...state.expenses];
    },
    deleteExpense(state) {
      //Delete from DB
      const url = `http://localhost:3001/delete/${state.currentExpense}`;
      Axios.delete(url).then((response) => console.log(response.data));
      //DElete from State
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== state.currentExpense
      );
      state.showDeleteModal = false;
      state.expenses = updatedExpenses;
      state.currentExpense = null;
    },
    toggleDeleteModal(state, action) {
      state.showDeleteModal = !state.showDeleteModal;
      state.currentExpense = action.payload;
    },
    toggleBackdrop(state) {
      state.showDeleteModal = false;
    },
    toggleExpenseForm(state) {
      state.showExpenseForm = !state.showExpenseForm;
    },
    resetUserInput(state) {
      state.userInput = {
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: today,
      };
    },
    titleChange(state, action) {
      state.userInput.enteredTitle = action.payload;
    },
    amountChange(state, action) {
      state.userInput.enteredAmount = action.payload;
    },
    dateChange(state, action) {
      state.userInput.enteredDate = action.payload;
    },
    filterChange(state, action) {
      state.filteredYear = action.payload;
    },
    clearError(state) {
      state.inputError = null;
    },
    setError(state, action) {
      state.inputError = action.payload;
    },
  },
});

export const expActions = expensesSlice.actions;
export default expensesSlice.reducer;
