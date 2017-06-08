const readline = require('readline');
const async = require('async');
const chalk = require('chalk');
const nedb = require('nedb');

const db = new nedb({ filename: 'store.db', autoload: true });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async.forever((next) => {
  rl.question('> ', text => {
    switch (text) {
      case '!exit':
        rl.close();
        process.exit(0);
        break;
      case '!log':
        console.log();
        db.find({}, (err, docs) => {
          if (!err) {
            for (const doc of docs) {
              console.log(`${chalk.green.bold(doc.timestamp)} - ${doc.text}`);
            }
            console.log();
            next();
          }
        });
        break;
      default:
        db.insert({ text, timestamp: new Date() }, (err, newDoc) => {
          if (err) {
            console.log(err);
          }
          next();
        });
        break;
    }
  });
});