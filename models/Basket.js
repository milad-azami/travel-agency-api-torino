const { writeData, readData } = require("../utils/fileHandler");

const Basket_FILE = 'Basket.json';

async function addToBasket (TourData) {
 await writeData(Basket_FILE, TourData)
}
async function  getFromBasket  () {
  return await readData(Basket_FILE)
}

module.exports = {
addToBasket,
getFromBasket
};