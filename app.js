var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var defaults = require('./routes/defaults');
var errands = require('./routes/errands');

var dbName = process.env.NODE_ENV == 'test' ?  'errandTestDB' : 'errandDB';
var connectionString = 'mongodb://localhost/' + dbName;
mongoose.connect(connectionString);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', defaults);
app.use('/errands', errands);

module.exports = app;

