const fs = require('fs');
const child_process = require('child_process');
const chalk = require('chalk');

const editTmpFile = () => {
  child_process.spawnSync(
    'vim', ['.tmp'],
    { stdio: 'inherit' }
  );
};

const listNotes = (notes) => {
  console.log(`${chalk.yellow.bold.underline('Index')} \t ${chalk.bold.underline('Title')}`);
  for (const note of notes) {
    console.log(`${chalk.yellow.bold(note.index)} \t ${note.title}`);
  }
};

const parseFileContents = () => {
  const fileContents = fs.readFileSync('.tmp');
  const contentString = fileContents.toString();
  const i = contentString.indexOf('\n');
  const title = contentString.slice(0, i);
  const body = contentString.slice(i + 1);
  return { title, body };
};

const newNote = () => {
  editTmpFile();
  if (fs.existsSync('.tmp')) {
    const note = parseFileContents();
    fs.unlinkSync('.tmp');
    return note;
  } else {
    console.error('Error');
  }
};

const editNote = (note) => {
  const noteString = note.title + note.body;
  fs.writeFileSync('.tmp', noteString);
  editTmpFile();
  const newNote = parseFileContents();
  fs.unlinkSync('.tmp');
  return newNote;
};

module.exports = {
  newNote,
  editNote,
  listNotes
};