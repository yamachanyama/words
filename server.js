var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb"),assert = require('assert');
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "words";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect("mongodb://satoru:9999@ds257848.mlab.com:57848/test-heroku" || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).sort({createDate:-1}).skip(parseInt(req.params.id)).limit(10).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});
app.get("/api/search/:id", function(req, res) {
  var query1 = ({word: new RegExp(".*" + req.params.id + ".*" , "i")});
  var query2 = ({meaning: new RegExp(".*" + req.params.id + ".*" , "i")});
/*  db.collection(CONTACTS_COLLECTION).find({ $or:[{word: req.params.id},{meaning: req.params.id}] }).toArray(function(err, docs) { */
  db.collection(CONTACTS_COLLECTION).find({ $or:[query1,query2] }).toArray(function(err, docs) { 
  if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(docs);
    }
  });
});
app.get("/api/count", function(req, res) {
  db.collection(CONTACTS_COLLECTION).count(function(err, docs) {
    if (err) {
        handleError(res, err.message, "Failed to get contact");
      } else {
        res.status(200).json(docs);
      }
    });
});


app.post("/api/contact", function(req, res) {
  var newDoc = req.body;
  newDoc.createDate = new Date();

  if (!req.body.word) {
    handleError(res, "Invalid user input", "Must provide a word.", 400);
  } else {
    db.collection(CONTACTS_COLLECTION).insertOne(newDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */
app.get("/api/contact/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id)}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/contact/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;
  updateDoc.createDate = new Date();

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, {$set:updateDoc}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/contact/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
