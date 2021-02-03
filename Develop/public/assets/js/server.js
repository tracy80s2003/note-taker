const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');

let notesInfo = [];

app.use(express.urlencoded({ extended: true}))
app.use(express.json())





app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});
  
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});
  
app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
});