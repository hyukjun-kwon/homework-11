const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require("express-ejs-layouts");
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// data initialization
let notes = [];
let selectNote = {};

async function init() {
  try {
    notes = await db.all();
    selectNote = notes.length === 0 ? {id:null, title: "", content: ""} : notes[0];
  }
  catch(err) {
    if(err) throw err;
  }
}

init();


// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');


// routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/notes', (req, res) => {
  res.render('notes', {
    notes: notes,
    selectNote: selectNote
  });
});


// api routes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  try {
    let note = req.body;

    // if note.id exist, it means UPDATE
    if(note.id) {
      await db.update(note.id, note.title, note.content);
      notes = await db.all();
      let getNote = await db.find(note.id)
      selectNote = getNote[0];
      res.send('updated');
    }
    // else, it means CREATE
    else {
      let newNoteId = await db.create("New note","");
      notes = await db.all();
      let getNote = await db.find(newNoteId);
      selectNote = getNote[0];
      res.send('added');
    }
  }
  catch(err) {
    if(err) throw err;
  }
});

app.delete('/api/notes', async (req, res) => {
  try {
    let note = req.body;

    if(note.id) {
      await db.delete(note.id);
      notes = await db.all();
      selectNote = notes.length === 0 ? {id:null, title: "", content: ""} : notes[0];

      res.send('deleted');
    }
  }
  catch(err) {
    if(err) throw err;
  }
})

app.post('/api/notes/current/:id', async (req, res) => {
  try{
    let getNote = await db.find(req.params.id);
    selectNote = getNote[0];

    res.send('changed');
  }
  catch(err) {
    if(err) throw err;
  }
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server listening to port ${PORT}`) });