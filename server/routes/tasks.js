var express = require('express');
var router = express.Router();

var pg = require('pg');

var config = {
  port: 5432,
  database: 'antares',
  host: 'localhost',
  max: 10,
  idleTimeout: 30000
};

var pool = new pg.Pool(config);

router.post('/', function(req, res){
  console.log('in post route', req.body);
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to the database', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      db.query('INSERT INTO tasks (name) VALUES ($1)', [req.body.name], function(errMakingQuery, result){
        done();
        if(errMakingQuery) {
          console.log('There was an error making the INSERT query', errMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

router.get('/', function(req, res){
  console.log('in get tasks route');
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to the database', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      db.query('SELECT * FROM tasks', function(errMakingQuery, result){
        done();
        if(errMakingQuery) {
          console.log('There was an error making the SELECT query', errMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

router.put('/complete/:id', function(req, res){
  console.log('in put route', req.params);
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to the database', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      db.query('UPDATE tasks SET is_complete=TRUE WHERE id=$1;', [req.params.id], function(errMakingQuery, result){
        done();
        if(errMakingQuery) {
          console.log('There was an error making the INSERT query', errMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.put('/undoComplete/:id', function(req, res){
  console.log('in put route', req.params);
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to the database', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      db.query('UPDATE tasks SET is_complete=FALSE WHERE id=$1;', [req.params.id], function(errMakingQuery, result){
        done();
        if(errMakingQuery) {
          console.log('There was an error making the INSERT query', errMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

// DELETE is similar to GET when using PG
router.delete('/:id', function(req, res){
  var id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id);

  // YOUR CODE HERE
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'DELETE from "tasks" WHERE id=$1;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }) // end pool
});


module.exports = router;
