const readline = require('readline');
const async = require('async');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async.forever((next) => {
  rl.question('> ', answer => {
    if (answer === 'exit') {
      rl.close();
    } else {
      console.log(`You said: ${chalk.green.bold(answer)}`);
      next();
    }
  });
});