const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');

let notesInfo = [];

app.use(express.urlencoded({ extended: true}))
app.use(express.json())


app.get("/api/notes", function(err, res) {
})

app.get("/api/notes", function(err, res) {
    try {
        notesInfo = fs.readFileSync("Develop/db/db.json", "utf8");
        console.log("hello!");
        notesInfo = JSON.parse(notesInfo);

    } catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }
    res.json(notesInfo);
  });
  
app.post("/api/notes", function(req, res) {
    try {
        notesInfo = fs.readFileSync("./Develop/db/db.json", "utf8");
        console.log(notesInfo);
          
        notesInfo = JSON.parse(notesInfo);
        req.body.id = notesInfo.length;
        notesInfo.push(req.body);
        notesInfo = JSON.stringify(notesInfo);
        fs.writeFile("./Develop/db/db.json", notesInfo, "utf8", function(err) {
            if (err) throw err;
        });
    res.json(JSON.parse(notesInfo));
} catch (err) {
    throw err;
    console.error(err);
}
});
  
// TO DELETE NOTE
app.delete("/api/notes/:id", function(req, res) {
    try {
        notesInfo = fs.readFileSync("./Develop/db/db.json", "utf8");
        notesInfo = JSON.parse(notesInfo);
        notesInfo = notesInfo.filter(function(note) {
        return note.id != req.params.id;
    });
        notesInfo = JSON.stringify(notesInfo);
        fs.writeFile("./Develop/db/db.json", notesInfo, "utf8", function(err) {
            if (err) throw err;
    });
        res.send(JSON.parse(notesInfo));
    } catch (err) {
    throw err;
    console.log(err);
    }
});

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