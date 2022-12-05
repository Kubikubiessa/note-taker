const fs = require("fs");

const util = require("util");
let db = require("../db/db.json");

// Promise version of fs.readFile, will be used in adding and deleting a note
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\n Note added to ${destination}`)
  );

// Function to read notes from file and append a new note

const readAndAppend = (content, file) => {
  const note = content;
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(note);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
