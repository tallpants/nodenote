const fs = require('fs');
const child_process = require('child_process');
const chalk = require('chalk');

const { newNote } = require('./helpers')

const dbProvider = require('./dbProvider');

let db = null;

dbProvider.getDb()
  .then(dbObject => {
    db = dbObject;
    db.ensureIndex({ fieldName: 'index', unique: true });
  });

module.exports.new = (next) => {

  const content = newNote();

  const note = {
    title: content.title,
    body: content.body,
    date: new Date()
  };

  db.count({}, (err, count) => {
    note.index = count;
    db.insert(note, () => {
      next();
    });
  });
}

module.exports.ls = (next) => {
  db.find({}).sort({ date: -1 }).exec((err, docs) => {
    if (docs.length === 0) {
      console.log('No docs found');
      next();
    } else {
      console.log(`${chalk.yellow.bold.underline('Index')} \t ${chalk.bold.underline('Title')}`);
      for (const doc of docs) {
        console.log(`${chalk.yellow.bold(doc.index)} \t ${doc.title}`);
      }
      next();
    }
  });
}

module.exports.rmall = (next) => {
  db.remove({}, { multi: true }, (err, numRemoved) => {
    console.log('Removed ' + numRemoved);
    next();
  });
}