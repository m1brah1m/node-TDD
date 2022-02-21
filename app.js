const express = require("express");
const dotenv = require("dotenv");
const pool = require("./db");

const app = express();
app.use(express.json());

dotenv.config();
const port = process.env.PORT;

// Create a note
app.post("/notes", async (req, res, next) => {
  try {
    if (!req.body.note_title || !req.body.note_body) {
      return res.status(400).json({ message: "Error" });
    }
    await pool.query("INSERT INTO notes(note_title,note_body) VALUES($1,$2)", [
      req.body.note_title,
      req.body.note_body,
    ]);
    res.status(201).json({ message: "Note Added" });
  } catch (error) {
    console.log(error);
  }
});

// List an array of notes
app.get("/notes", async (req, res, next) => {
  try {
    const notes = await pool.query("SELECT * FROM notes");
    if (!notes.rows[0]) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(notes.rows);
  } catch (error) {
    console.log(error);
  }
});

// Get a note by id
app.get("/notes/:id", async (req, res, next) => {
  try {
    const note = await pool.query("SELECT * FROM notes WHERE id=$1", [
      req.params.id,
    ]);
    if (!note.rows[0]) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(note.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// Update a note by id
app.put("/notes/:id", async (req, res, next) => {
  try {
    const note = await pool.query("SELECT * FROM notes WHERE id=$1", [
      req.params.id,
    ]);
    if (!note.rows[0]) {
      return res.status(404).json({ message: "Not Found" });
    }

    await pool.query(
      "UPDATE notes SET note_body=$1,note_title=$2 WHERE id=$3;",
      [req.body.note_body, req.body.note_title, req.params.id]
    );

    res.status(200).json({ message: "Note Updated" });
  } catch (error) {
    console.log(error);
  }
});

// Delete a note by id
app.delete("/notes/:id", async (req, res, next) => {
  try {
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Up on ${port}`);
});

module.exports = app;
