const nedb = require('nedb');

let _db = null;

const initDb = () => new Promise((resolve, reject) => {
  _db = new nedb({ filename: '../store.db', autoload: true });
  process.nextTick(() => resolve(_db));
});

const getDb = () => new Promise((resolve, reject) => {
  process.nextTick(() => resolve(_db));
});

module.exports = {
  initDb,
  getDb
}