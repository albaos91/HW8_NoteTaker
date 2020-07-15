//Need fs require here
var fs = require("fs");

// Need path require here  for directory
var path = require("path");

//Need a db directory and pathway?
const database = path.resolve(__dirname, "../db");

// Will I need to start the counter with a variable??
let idCounter = 1;

//API routes here
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

  //API POST for notes in the database file
  app.post("/api/notes", function (req, res) {
    // for POSt I will need an empty array variable,
    let notesObject = [];

    // variable for the data inside the above array,
    let data = fs.readFileSync(path.resolve(database, "db.json"), "utf8");
    notesObject = JSON.parse(data);

    // assign that new object from the POST, an ID, TITLE, and TEST
    let newNoteObject = {
      id: idCounter,
      title: req.body.title,
      text: req.body.text,
    };

    //Need to add the note to the to the notes Object variable (push)
    notesObject.push(newNoteObject);

    //Need to write to the files (fs.write to file)
    fs.writeFileSync(
      path.resolve(database, "db.json"),
      JSON.stringify(notesObject),
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
    //Need to return the new note and then increase the counter by 1 for special id purpose
    res.json(newNoteObject);
    idCounter += 1;
  });

  //API DELETE request for the notes in my db file
  app.delete("/api/notes/:id", function (req, res) {
    //array variable
    let notesObject = [];

    //Use the data variable similar to POST
    let data = fs.readFileSync(path.resolve(database, "db.json"), "utf8");
    notesObject = JSON.parse(data);

    //variable to begin the index to track the note that is set to be deleted?
    let noteIndex = 0;
    //Need a for loop to loop through the array
    for (var i = 0; i < notesObject.length; i++) {
      if (notesObject[i].id === parseInt(req.params.id)) {
        noteIndex = i;
        break;
      }
    }
    //splice for the note to delete
    notesObject.splice(noteIndex, 1);

    //Need to update the db.json
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
