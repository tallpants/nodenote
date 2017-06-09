const nedb = require('nedb');

let _db = null;

module.exports = {
  initDb: () => new Promise((resolve, reject) => {
    _db = new nedb({ filename: '../store.db', autoload: true });
    process.nextTick(() => {
      resolve(_db);
    });
  }),

  getDb: () => new Promise((resolve, reject) => {
    process.nextTick(() => resolve(_db));
  })
};