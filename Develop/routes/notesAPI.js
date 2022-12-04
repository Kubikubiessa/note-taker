const notesAPI = require('express').Router();
const { readFromFile, writeToFile, readAndAppend, deleteNote } = require('../helpers/fsUtils');
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
notesAPI.delete('/:id', (req, res) => {
    const { id } = req.params;
//     savedNotes = deleteNote(id, savedNotes);
//     console.log('savedNotes: ', savedNotes);
//    // console.log('savedNoteIndex: ', savedNotesIndex);
//     res.json(savedNotes);
    // let index = 0;
    //     savedNotes.forEach(note => {
    //         note.id = index;
    //         index +=1; 
            
    // savedNotesIndex = savedNotes.findIndex(newNote => newNote.id === id);
    // savedNotes.splice(savedNotesIndex, 1);
    //readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
   // writeToFile('./db/db.json');

    
    //return res.send(savedNotes);
    deleteNote(id)
        .then(() => {
            return res.json({message: 'note deleted successfully'})



        })
        .catch((err) => {
            return res.status(500).json(err)
        });
});

module.exports = notesAPI;