const chalk = require('chalk');

const dbProvider = require('./dbProvider');

let db = null;

dbProvider.getDb()
  .then(dbObject => db = dbObject);

module.exports.printLogs = next => {
  db.find({}, (err, docs) => {
    if (!err) {
      if (docs.length === 0) {
        console.log(`${chalk.yellow('No logs found')}`);
        next();
      } else {
        console.log();
        for (const doc of docs)
          console.log(`${chalk.green.bold(doc.timestamp)} - ${doc.text}`);
        console.log();
      }
    }
    next();
  });
}

module.exports.clearLogs = next => {
  db.remove({}, { multi: true }, err => {
    if (err)
      console.error(err);
    next();
  });
}

module.exports.log = (text, next) => {
  db.insert({ text, timestamp: new Date() }, err => {
    if (err)
      console.error(err);
    next();
  });
}