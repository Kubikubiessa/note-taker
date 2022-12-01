const notesAPI = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const savedNotes = require('../db/db.json');
 
 

let id = savedNotes.length;
//notesAPI.use('/db/db.json', savedNotes)

//GET route for retrieving the notes
notesAPI.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`)
   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST route for adding a note
notesAPI.post('/', (req, res) => {
    console.info(`${req.method} request received for adding a note`)
    //req.body.id = 1++;
    console.log(req.body);

    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id,

        };
    
    readAndAppend(newNote, './db/db.json');
    const response = {
        status: 'success',
        body: newNote,
    }
    res.json(response)
}else {
    res.json('Error in creating new note');
}
});
notesAPI.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    savedNotesIndex = savedNotes.findIndex(newNote => newNote.id === id);
    savedNotes.splice(savedNotesIndex, 1);
    return res.send();
})

module.exports = notesAPI;