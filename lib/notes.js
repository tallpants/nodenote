const chalk = require('chalk');

const { newNote, editNote } = require('./helpers')

const dbProvider = require('./dbProvider');

let db = null;

dbProvider.getDb()
  .then(dbObject => db = dbObject);

const create = (next) => {
  const content = newNote();

  db.count({}, (err, count) => {
    content.index = count;
    db.insert(content, () => {
      next();
    });
  });
};

const ls = (next) => {
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
};

const rmall = (next) => {
  db.remove({}, { multi: true }, (err, numRemoved) => {
    console.log('Removed ' + numRemoved);
    next();
  });
}

const view = (index, next) => {
  db.find({ index: Number(index) }, (err, docs) => {
    if (docs.length === 0) {
      console.log('No record found');
      next();
    } else {
      console.log(`\n${chalk.bold.underline(docs[0].title)}\n${docs[0].body}`);
      next();
    }
  });
};

const dump = (next) => {
  db.find({}, (err, docs) => {
    console.log(docs);
    next();
  });
};

const edit = (index, next) => {
  db.find({ index: Number(index) }, (err, docs) => {
    if (docs.length === 0) {
      console.log('No record found');
      next();
    } else {
      const content = editNote(docs[0]);
      db.update({ index: Number(index) },
        { $set: { title: content.title, body: content.body } },
        {}, (err, docs) => {
          next();
        });
    }
  });
};

const rm = (index, next) => {
  db.remove({ index: Number(index) }, {}, (err, numRemoved) => {
    if (numRemoved === 0) {
      console.log('No records found');
      next();
    } else {
      console.log('Removed record');
      next();
    }
  });
};

module.exports = {
  create,
  edit,
  ls,
  rmall,
  view,
  rm,
  dump
};