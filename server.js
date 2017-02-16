(function () {
  'use strict';

  var express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

  if (process.env.ENV === 'development') {
    require('dotenv').config();
  }
  

  // Setting database

  var db;
  var uristring = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST;
  if (process.env.ENV === 'development') {
    db = mongoose.connect('mongodb://localhost/winners_test');
  } else {
    db = mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
  }

  var Winner = require('./models/winnerModel');

  var app = express();

  var port = process.env.PORT || 3000;

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // Routes

  var winnerRouter = require('./routes/winnerRoutes')(Winner);
  //var winnerRouter = require('./routes/winnerRoutes.js');

  app.use('/api/winners', winnerRouter);

  app.get('/', function (req, res) {
    //res.send('Cloudy with a chance of retirement.');
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/fetch_numbers', function (req, res) {
    var MoneyBag = require('./slot_machine/money_bag')(Winner);
    MoneyBag.lotto();  
    MoneyBag.power();  
    MoneyBag.mega();
  });

  app.listen(port, function () {
    console.log('money line on port: ' + port);
  });

  // Calling Master chief of all cron Jobs
  var chief = require('./cron_jobs/chief_master')();

  module.exports = app;

})();