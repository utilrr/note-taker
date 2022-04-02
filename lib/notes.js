const fs = require("fs");
const path = require("path");

const createNewNote = (note, notesArray) => {
  // adds new note to notes array
  notesArray.push(note);

  // saves notes array to db.json
  fs.writeFileSync(
    path.join(__dirname, "../data/notes.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
};

function deleteById(id, notesArray) {
  // filter notes array by all but the id we want to delete (check logic)
  const result = notesArray.filter((note) => note.id !== id);
  console.log(result);
  // write to notes.json with new filtered array
  fs.writeFile(
    path.join(__dirname, "../data/notes.json"),
    JSON.stringify({ notes: result }, null, 2),
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
  return result;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  if (!note.id || typeof note.id !== "string") {
    return false;
  }
  return true;
}

module.exports = { createNewNote, deleteById, validateNote };
