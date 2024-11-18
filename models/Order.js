const { readData, writeData } = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

const ORDERS_FILE = 'Order.json';

const getAllOrders = async () => {
  return await readData(ORDERS_FILE);
};

const getOrderById = async (id) => {
  const orders = await readData(ORDERS_FILE);
  return orders.find(order => order.id === id);
};
const getOrderByUserId = async (id) => {
  const orders = await readData(ORDERS_FILE);
  return orders.find(order => order.userId === id);
};
const getOrdersByUserId = async (id) => {
  const orders = await readData(ORDERS_FILE);
  return orders.filter(order => order.userId === id);
};

const createOrder = async (orderData) => {
  const orders = await readData(ORDERS_FILE);
  const newOrder = { id: uuidv4(), ...orderData, createdAt: new Date() };
  orders.push(newOrder);
  await writeData(ORDERS_FILE, orders);
  return newOrder;
};

const updateOrder = async (id, updatedData) => {
  const orders = await readData(ORDERS_FILE);
  const index = orders.findIndex(order => order.id === id);
  if (index === -1) return null;
  orders[index] = { ...orders[index], ...updatedData };
  await writeData(ORDERS_FILE, orders);
  return orders[index];
};

const deleteOrder = async (id) => {
  let orders = await readData(ORDERS_FILE);
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex === -1) return null;
  const deletedOrder = orders.splice(orderIndex, 1)[0];
  await writeData(ORDERS_FILE, orders);
  return deletedOrder;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByUserId,
  getOrdersByUserId
};
