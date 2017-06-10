const fs = require('fs');
const child_process = require('child_process');

const editor = () => {
  child_process.spawnSync(
    'vim', ['.tmp'],
    { stdio: 'inherit' }
  );
}

const parseInput = () => {
  const fileContents = fs.readFileSync('.tmp');
  const contentString = fileContents.toString();
  const i = contentString.indexOf('\n');
  const title = contentString.slice(0, i);
  const body = contentString.slice(i + 1);
  return { title, body };
}

const newNote = () => {
  editor();
  if (fs.existsSync('.tmp')) {
    const note = parseInput();
    fs.unlinkSync('.tmp');
    return note;
  } else {
    console.error('Error');
  }
}

const editNote = (note) => {
  const noteString = note.title + note.body;
  fs.writeFileSync('.tmp', noteString);
  editor();
  const newNote = parseInput();
  fs.unlinkSync('.tmp');
  return newNote;
}

module.exports = {
  newNote,
  editNote
}