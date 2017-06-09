const fs = require('fs');
const util = require('util');
const child_process = require('child_process');

function textEdit() {
  child_process.spawnSync(
    process.env.EDITOR || 'nano' || 'notepad',
    ['.tmp'],
    { stdio: 'inherit' }
  );

  if (fs.existsSync('.tmp')) {
    let fileContents = fs.readFileSync('.tmp');
    fs.unlinkSync('.tmp');
    return fileContents.toString();
  } else {
    console.error('Error');
  }
}

module.exports = {
  textEdit
};