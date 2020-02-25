const express = require('express');
const notes_db = require('../db');

const router = express.Router();


router.get('/notes', async (req, res) => {
  try {
    let data = await notes_db.all();
    res.json(data);
  }
  catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/notes', async(req, res) => {
  try {
    let data = req.body;
    let response = await notes_db.create(data.title, data.content);
    res.json(response);
  }
  catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
})

module.exports = router;