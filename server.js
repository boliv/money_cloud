(function () {
  'use strict';

  var express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

  require('dotenv').config();

  var db;
  console.log('process.env.ENV', process.env.ENV);
  if (process.env.ENV === 'development') {
    db = mongoose.connect('mongodb://localhost/money_cloud_test');
  } else {
    db = mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST);
  }

  var Winner = require('./models/winnerModel');

  var app = express();

  var port = process.env.PORT || 3000;

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  var winnerRouter = require('./routes/winnerRoutes')(Winner);
  //var winnerRouter = require('./routes/winnerRoutes.js');

  app.use('/api/winners', winnerRouter);

  app.get('/', function (req, res) {
    res.send('Cloudy with a chance of retirement.');
  });

  app.listen(port, function () {
    console.log('money line on port: ' + port);
  });

  module.exports = app;

})();