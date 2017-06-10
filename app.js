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
      rl.question('> ', answer => {
        let answerStrings = answer.split(' ');
        switch (answerStrings[0]) {
          case 'exit':
            process.exit(0);
          case 'ls':
            notes.ls(next);
            break;
          case 'new':
            notes.new(next);
            break;
          case 'rmall':
            notes.rmall(next);
            break;
          case 'view':
            notes.view(answerStrings[1], next);
            break;
          case 'dump':
            notes.dump(next);
            break;
          default:
            notes.view(answer, next);
            console.log('?');
            next();
        }
      });
    });
  });