const chalk = require('chalk');

const { newNote, editNote, listNotes } = require('./helpers')

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
      listNotes(docs);
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
      const note = editNote(docs[0]);
      db.update({ index: Number(index) },
        { $set: { title: note.title, body: note.body } }, (err, docs) => {
          next();
        });
    }
  });
};

const rm = (index, next) => {
  if (index === '*') {
    rmall(next);
  } else {
    db.remove({ index: Number(index) }, {}, (err, numRemoved) => {
      if (numRemoved === 0) {
        console.log('No records found');
        next();
      } else {
        console.log('Removed record');
        next();
      }
    });
  }
};

const find = (searchString, next) => {
  try {
    const regexString = new RegExp(searchString, 'i');
    db.find({ $or: [{ title: regexString }, { body: regexString }] },
      (err, docs) => {
        if (docs.length === 0) {
          console.log('No docs found');
          next();
        } else {
          listNotes(docs);
          next();
        }
      });
  } catch (err) {
    console.log(err.message);
    next();
  }
};

module.exports = {
  create,
  edit,
  ls,
  rmall,
  view,
  rm,
  find,
  dump
};