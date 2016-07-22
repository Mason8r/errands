var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var errands = require('./routes/errands');

var dbName = process.env.PORT || 'errandDB';

var connectionString = 'mongodb://localhost/' + dbName;

console.log(connectionString)

var app = express();

mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res) {
    res.json({data:'API V.0.1'});
})

app.use('/errands', errands);

module.exports = app;

