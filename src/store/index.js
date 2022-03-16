const fs = require('fs');

const file = `${__dirname}/store.json`;

const getStore = () => {
  let result = { books: [] };

  try {
    const storeJSON = fs.readFileSync(file, 'utf-8');

    result = JSON.parse(storeJSON);
  } catch (err) {
    throw new Error(err);
  }

  return result;
};

let store = getStore();

const setStore = (newStore = { books: [] }) => {
  store = newStore;

  setTimeout(() => {
    fs.writeFile(file, JSON.stringify(newStore), (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  }, 200);
};

module.exports = { getStore, setStore, store };