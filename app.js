const readline = require('readline');
const async = require('async');

const dbProvider = require('./lib/dbProvider');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

