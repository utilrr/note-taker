const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
var uniqid = require("uniqid");

// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");

// parse POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let notes = JSON.parse(data);
    res.send(notes);
  });
});

app.post("/api/notes", (req, res) => {
  req.body.id = uniqid();
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let notes = JSON.parse(data);
    const note = req.body;
    notes.push(note);
    fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(notes, null, 2)
    );
    res.send(notes);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const noteToDelete = req.params.id.replace(":", "");
  console.log(noteToDelete);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let notes = JSON.parse(data);
    console.log(notes);
    const newNotes = notes.filter((note) => note.id !== noteToDelete);
    console.log(newNotes);

    fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(newNotes, null, 2)
    );
    res.send(newNotes);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
