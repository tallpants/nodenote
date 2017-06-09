const helpers = require('./lib/helpers');

async function main() {
  try {
    let userInput = await helpers.textEdit();
    console.log(userInput);
  } catch (error) {
    console.log(error);
  }
}

main();