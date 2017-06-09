const fs = require('fs');
const child_process = require('child_process');
const chalk = require('chalk');

const dbProvider = require('./dbProvider');

let db = null;

dbProvider.getDb()
  .then(dbObject => db = dbObject);

function newNote() {
  child_process.spawnSync(
    process.env.EDITOR || 'nano',
    ['.tmp'],
    { stdio: 'inherit' }
  );

  if (fs.existsSync('.tmp')) {
    const fileContents = fs.readFileSync('.tmp');
    fs.unlinkSync('.tmp');

    const contentString = fileContents.toString();
    const i = contentString.indexOf('\n');
    const title = contentString.slice(0, i);
    const body = contentString.slice(i + 1);

    return { title, body }
  } else {
    console.error('Error');
  }
}

module.exports.newNote = (next) => {

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