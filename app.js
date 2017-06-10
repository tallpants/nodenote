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
        switch (answer.split(' ')[0]) {
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
          default:
            console.log('?');
            next();
        }
      });
    });
  });