const readline = require('readline');
const async = require('async');
const chalk = require('chalk');
const nedb = require('nedb');

const db = new nedb({ filename: 'store.db', autoload: true });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function exit() {
  rl.close();
  process.exit(0);
}

function printLogs(next) {
  db.find({}, (err, docs) => {
    if (!err) {
      if (docs.length === 0) {
        console.log(`${chalk.yellow('No logs found')}`);
        next();
      } else {
        console.log();
        for (const doc of docs) {
          console.log(`${chalk.green.bold(doc.timestamp)} - ${doc.text}`);
        }
        console.log();
      }
    }
    next();
  });
}

function clearLogs(next) {
  db.remove({}, { multi: true }, err => {
    if (err) {
      console.error(err);
    }
    next();
  });
}

function log(text, next) {
  db.insert({ text, timestamp: new Date() }, (err, newDoc) => {
    if (err) {
      console.error(err);
    }
    next();
  });
}

async.forever(next => {
  rl.question('> ', text => {
    switch (text) {
      case '!exit':
        exit();
        break;
      case '!logs':
        printLogs(next);
        break;
      case '!clearlogs':
        clearLogs(next);
        break;
      default:
        log(text, next);
        break;
    }
  });
});