const fs = require('fs').promises;
const path = require('path');

const dataDirectory = path.join(__dirname, '..', 'DB');

const readData = async (filename) => {
  try {
    const data = await fs.readFile(path.join(dataDirectory, filename), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return an empty array
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeData = async (filename, data) => {
  try {
    await fs.writeFile(
      path.join(dataDirectory, filename),
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  } catch (error) {
    throw error;
  }
};


// Find an item by a specific key-value pair
const findByKey = async (filename, key, value) => {
  const data = await readData(filename);
  return data.filter(item => item[key] === value);
};


module.exports = {
  readData,
  writeData,
  findByKey
};