const dbProvider = require('./dbProvider');
const textEdit = require('./helpers').textEdit;

let db = null;

dbProvider.getDb()
  .then(dbObject => db = dbObject);

module.exports.newNote = (next) => {
  const note = {
    content: textEdit(),
    date: new Date()
  };

  db.insert(note, () => {
    next();
  });
}

module.exports.ls = (next) => {
  db.find({}).sort({ date: -1 }).exec((err, docs) => {
    if (docs.length === 0) {
      console.log('No docs found');
      next();
    } else {
      console.log();
      for (const doc of docs) {
        console.log(`${doc.date} -- ${doc.content}`);
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