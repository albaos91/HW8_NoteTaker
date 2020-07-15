var fs = require("fs");
var path = require("path");

const database = path.resolve(__dirname, "../db");

let idCounter = 1;

//API routes
module.exports = function (app) {
  //API GETrequest for the notes in database file
  app.get("/api/notes", function (req, res) {
    fs.readFile(path.resolve(database, "db.json"), "utf8", function (
      err,
      data
    ) {
      res.json(JSON.parse(data));
    });
  });

  //API POST
  app.post("/api/notes", function (req, res) {
    let notesObject = [];

    let data = fs.readFileSync(path.resolve(database, "db.json"), "utf8");
    notesObject = JSON.parse(data);

    let newNoteObject = {
      id: idCounter,
      title: req.body.title,
      text: req.body.text,
    };

    notesObject.push(newNoteObject);

    fs.writeFileSync(
      path.resolve(database, "db.json"),
      JSON.stringify(notesObject),
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );

    res.json(newNoteObject);
    idCounter += 1;
  });

  //API DELETE
  app.delete("/api/notes/:id", function (req, res) {
    let notesObject = [];

    //Use the data variable similar to POST
    let data = fs.readFileSync(path.resolve(database, "db.json"), "utf8");
    notesObject = JSON.parse(data);

    //variable to begin the index to track the note that is set to be deleted?
    let noteIndex = 0;
    for (var i = 0; i < notesObject.length; i++) {
      if (notesObject[i].id === parseInt(req.params.id)) {
        noteIndex = i;
        break;
      }
    }
    //splice for the note to delete
    notesObject.splice(noteIndex, 1);

    fs.writeFileSync(
      path.resolve(database, "db.json"),
      JSON.stringify(notesObject),
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
    res.json(true);
  });
};
