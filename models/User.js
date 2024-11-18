
const { readData, writeData } = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

const USERS_FILE = 'User.json';

// Get all users
const getAllUsers = async () => {
  return await readData(USERS_FILE);
};

// Get user by ID
const getUserById = async (id) => {
  const users = await readData(USERS_FILE);
  return users.find(user => user.id === id);
};

// Get user by mobile
const getUserByMobile = async (mobile) => {
  const users = await readData(USERS_FILE);
  return users.find(user => user.mobile === mobile);
};

// Create a new user
const createUser = async (userData) => {
  const users = await readData(USERS_FILE);
  
  // Check for unique mobile
  if (users.some(user => user.mobile === userData.mobile)) {
    throw new Error('Mobile number must be unique');
  }
  
  // Validate gender
  if (userData.gender && !['male', 'female'].includes(userData.gender)) {
    throw new Error('Gender must be either male or female');
  }
  
  const newUser = { id: uuidv4(), ...userData, otpExpires: null };
  users.push(newUser);
  await writeData(USERS_FILE, users);
  return newUser;
};

// Update an existing user
const updateUser = async (id, updatedData) => {
  const users = await readData(USERS_FILE);
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return null;
  
  // If updating mobile, ensure uniqueness
  if (updatedData.mobile && updatedData.mobile !== users[index].mobile) {
    if (users.some(user => user.mobile === updatedData.mobile)) {
      throw new Error('Mobile number must be unique');
    }
  }
  
  // Validate gender
  if (updatedData.gender && !['male', 'female'].includes(updatedData.gender)) {
    throw new Error('Gender must be either male or female');
  }
  
  users[index] = { ...users[index], ...updatedData };
  await writeData(USERS_FILE, users);
  return users[index];
};

// Delete a user
const deleteUser = async (id) => {
  let users = await readData(USERS_FILE);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  const deletedUser = users.splice(userIndex, 1)[0];
  await writeData(USERS_FILE, users);
  return deletedUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByMobile,
  createUser,
  updateUser,
  deleteUser,
};
