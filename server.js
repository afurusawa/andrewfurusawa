var express         = require('express');
var path            = require('path');
//var mongoose        = require('mongoose');
var app             = express();

var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');

// Express config
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//app.use('/static', express.static(__dirname + '/www'));
//app.use(express.static(__dirname + '/www'));
//app.use(express.static(__dirname + '/app/services'));
//app.use(express.static(__dirname + '/app/config'));

app.use(express.static(__dirname + '/imgs'));
app.use(express.static(__dirname + '/styles'));

// Jade
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

// Connect to DB
//mongoose.connect(configDB.url); // connect to our database

// Routes
require('./routes.js')(app);

// Launch
var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});