const fs = require('fs');
const child_process = require('child_process');

const newNote = () => {
  child_process.spawnSync(
    process.env.EDITOR || 'vim' || 'nano',
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
    return { title, body };
  } else {
    console.error('Error');
  }
}

const editNote = () => {

}

module.exports = {
  newNote,
  editNote
}