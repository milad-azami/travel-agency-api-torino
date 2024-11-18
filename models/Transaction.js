const { readData, writeData } = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

const TRANSACTIONS_FILE = 'Transaction.json';

const getAllTransactions = async () => {
  return await readData(TRANSACTIONS_FILE);
};

const getTransactionsByUserId = async (id) => {
  const transactions = await readData(TRANSACTIONS_FILE);
  return transactions.filter(transaction => transaction.userId === id);
};

const createTransaction = async (transactionData) => {
  const transactions = await readData(TRANSACTIONS_FILE);
  const newTransaction = { id: uuidv4(), ...transactionData, createdAt: new Date() };
  transactions.push(newTransaction);
  await writeData(TRANSACTIONS_FILE, transactions);
  return newTransaction;
};

const updateTransaction = async (id, updatedData) => {
  const transactions = await readData(TRANSACTIONS_FILE);
  const index = transactions.findIndex(transaction => transaction.id === id);
  if (index === -1) return null;
  transactions[index] = { ...transactions[index], ...updatedData };
  await writeData(TRANSACTIONS_FILE, transactions);
  return transactions[index];
};

const deleteTransaction = async (id) => {
  let transactions = await readData(TRANSACTIONS_FILE);
  const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
  if (transactionIndex === -1) return null;
  const deletedTransaction = transactions.splice(transactionIndex, 1)[0];
  await writeData(TRANSACTIONS_FILE, transactions);
  return deletedTransaction;
};

module.exports = {
  getAllTransactions,
  getTransactionsByUserId,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
