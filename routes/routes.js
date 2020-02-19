var path = require("path");
var fs = require("fs");
var db = require("../db/db.json");
var count = 1
function routes(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.post("/api/notes", function(req, res) {
      req.body.id = count++
    db.push(req.body);
    console.log(db)
    db = JSON.stringify(db)
    fs.writeFile("./db/db.json", db, function(error, data) {
      if (error) {
        console.log(error);
      }
    });

    res.json(db);
  });
  app.get("/api/notes", function(req,res){
      db = JSON.parse(db)
      console.log(db)
      res.json(db)
  })
  app.delete("/api/notes/:id", function(req,res){
      var id = req.params.id
    var myObject = {'id': id};
    db.splice(db.indexOf(myObject),1); 
    db = JSON.stringify(db)
    fs.writeFile("./db/db.json", db, function(error, data) {
        if (error) {
          console.log(error);
        }
      });
    res.json(db)
  })
}

module.exports = routes;
