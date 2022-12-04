const fs = require('fs');

const util = require('util');
let db = require('../db/db.json')


// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
 
const writeToFile = (destination, content) => 
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => err ? console.error(err) : console.info(`\n Note added to ${destination}`)
);

// Function to read notes from file and append a new note
 
const readAndAppend = (content, file) => {
    const note = content;
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            
    }else{
        const parsedData = JSON.parse(data);
        parsedData.push(note);
        writeToFile(file, parsedData);
    }
    });
};
const deleteNote = (id) => {
    return new Promise( (resolve, reject) => {
        resolve('test')
    })

    };
    // let savedNotes = notes.filter(el => {
    //     if(el.id == id) {
    //         return false
    //     }else{
    //         return true
    //     }
        // let index = 0;
        // savedNotes.forEach(note => {
        //     note.id = index;
        //     index +=1; 

        
        //);
        // fs.writeFile(destination, JSON.stringify({savedNotes}, null, 4));
        // return savedNotes
   // }
    //)
//};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteNote };
