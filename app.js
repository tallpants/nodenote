const readline = require('readline');
const async = require('async');

const notes = require('./lib/notes');
const dbProvider = require('./lib/dbProvider');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

dbProvider.initDb()
  .then(() => {
    async.forever(next => {
      rl.question('> ', text => {
        switch (text) {

          case '!exit':
            rl.close();
            process.exit(0);

          case '!logs':
            notes.printLogs(next);
            break;

          case '!clearlogs':
            notes.clearLogs(next);
            break;

          default:
            notes.log(text, next);
            break;
        }
      });
    });
  });
