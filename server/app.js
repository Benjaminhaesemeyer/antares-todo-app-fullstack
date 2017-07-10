var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var tasks = require('./routes/tasks');
var bodyParser = require('body-parser');

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use('/tasks', tasks);

app.listen(port, function(){
  console.log('starting application');
  console.log('listening on port:', port);
});
