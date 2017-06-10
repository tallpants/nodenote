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
          case 'create':
          case 'new':
            notes.create(next);
            break;
          case 'rmall':
            notes.rmall(next);
            break;
          case 'dump':
            notes.dump(next);
            break;
          case 'edit':
            notes.edit(answerStrings[1], next);
            break;
          case 'view':
            notes.view(answerStrings[1], next);
            break;
          default:
            notes.view(answerStrings[0], next);
        }
      });
    });
  });