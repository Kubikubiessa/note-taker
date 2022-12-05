const express = require('express');

// Import modular routers for /notesAPI
const notesRouter = require('./notesAPI');
 

const app = express();

app.use('/notes', notesRouter);
 

module.exports = app;
