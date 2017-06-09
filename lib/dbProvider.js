const nedb = require('nedb');

let _db = null;

module.exports = {
  initDb: () => new Promise((resolve, reject) => {
    _db = new nedb({ filename: '../store.db' })
      .loadDatabase(err => {
        if (err)
          reject(err);
        resolve(_db);
      });
  }),

  getDb: () => _db
};