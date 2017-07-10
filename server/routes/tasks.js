var express = require('express');
var router = express.Router();

var pg = require('pg');

var config = {
  port: 5432,
  database: 'antares_tasks',
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

module.exports = router;
