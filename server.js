const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
const app = express();

//express use method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api' , api),

app.use(express.static(path.join(__dirname, 'public')));


//HTML routes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//Port activated
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
