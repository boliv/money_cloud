(function () {
  'use strict';

  var express = require('express');

  var routes = function (Winner) {
    var winnerRouter = express.Router();

    var winnersController = require('../controllers/winnersController')(Winner);

    winnerRouter.route('/')
    	.get(winnersController.get)
    	.post(winnersController.post);

    return winnerRouter;
  }

  module.exports = routes;

})();