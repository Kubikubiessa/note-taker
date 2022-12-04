const notesAPI = require("express").Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");
const savedNotes = require("../db/db.json");

const uniqid = require("uniqid");

//GET route for retrieving the notes
notesAPI.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST route for adding a note
notesAPI.post("/", (req, res) => {
  console.info(`${req.method} request received for adding a note`);

  console.log(req.body);

  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    readAndAppend(newNote, "./db/db.json");
    const response = {
      status: "success",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json("Error in creating new note");
  }
});
//Route to DELETE notes
notesAPI.delete("/:id", (req, res) => {
  const { id } = req.params;
  readFromFile("./db/db.json").then((data) => {
    let notes = JSON.parse(data);
    let filteredNotes = notes.filter((note) => note.id !== id);
    writeToFile("./db/db.json", filteredNotes);
    res.json(filteredNotes);
  });
});

module.exports = notesAPI;
