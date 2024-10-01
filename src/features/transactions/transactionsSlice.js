import { createSlice } from "@reduxjs/toolkit";

/**
 * Each transaction is recorded as an object with the following properties.
 * @typedef Transaction
 * @property {"deposit"|"withdrawal"|"transfer/[name]"} type
 * @property {number} amount
 * @property {number} balance - The balance after the transaction is completed.
 */

// TODO: Set initial state to have a balance of 0 and an empty array of transactions.

/** @type {{balance: number, history: Transaction[]}} */
const initialState = {
  balance: 0,
  history: [],
};

/* TODO
Add two reducers  to the transactions slice: "deposit" and "transfer".
Both reducers update the balance and then record the transaction.

"deposit" should increase the balance by the amount in the payload,
while "transfer" should decrease the balance by the amount in the payload.

Refer to the "withdrawal" reducer, which is already implemented for you.
*/

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    withdrawal: (state, { payload }) => {
      if (state.balance >= payload.amount) {
        state.balance -= payload.amount;
        state.history.push({
          type: "withdrawal",
          amount: payload.amount,
          balance: state.balance,
        });
      } else {
        alert("You don't have enough funds");
      }
    },
    deposit: (state, { payload }) => {
      state.balance += payload.amount;
      state.history.push({
        type: "deposit",
        amount: payload.amount,
        balance: state.balance,
      });
    },
    transfer: (state, { payload }) => {
      if (state.balance >= payload.amount) {
        state.balance -= payload.amount;
        state.history.push({
          type: `transfer/${payload.recipient}`,
          amount: payload.amount,
          balance: state.balance,
        });
      } else {
        alert("You don't have enough funds");
      }
    },
    undo: (state) => {
      const lastTransaction = state.history.pop();
      if (lastTransaction) {
        if (lastTransaction.type === "withdrawal") {
          state.balance += lastTransaction.amount;
        } else if (lastTransaction.type === deposit) {
          state.balance - +lastTransaction.amount;
        } else if (lastTransaction.type.startsWith("transfer") === "transfer") {
          state.balance += lastTransaction.amount;
        }
      }
    },
  },
});

export const { deposit, withdrawal, transfer, undo } =
  transactionsSlice.actions;

export const selectBalance = (state) => state.transactions.balance;
export const selectHistory = (state) => state.transactions.history;

export default transactionsSlice.reducer;
