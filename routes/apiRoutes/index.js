const router = require("express").Router();
const { createNewNote, deleteById, validateNote } = require("../../lib/notes");
let { notes } = require("../../data/notes");
// Check this line vs. uuid?
// const uniqid = require("uniqid");

// note that getting all notes does not call notes.js file for further processing
router.get("/notes", (req, res) => {
  res.json(notes);
});

// delete note using id parameter calling deleteById in notes.js
router.delete("/notes/:id", (req, res) => {
  const result = deleteById(req.params.id, notes);
  if (result) {
    notes = result;
    res.json(result);
  } else {
    res.send(404);
  }
});

// post new note using with unique ID by calling createNEwNote in notes.js
router.post("/notes", (req, res) => {
  // add a unique id to the incoming note in the body of the post request
  const noteId = uniqid.time();
  req.body.id = noteId;
  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
