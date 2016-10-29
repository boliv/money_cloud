(function () {
  'use strict';

  var Winner = require('../models/winnerModel');
  var MoneyBag = require('../slot_machine/money_bag')(Winner);
  
  var CronJob = require('cron').CronJob;

  var lotteryCrons = function(){

    var lottoJob = new CronJob({
      cronTime: '00 45 21 * * 3,6',
      onTick: function() {
        /*
         * Runs every (Wednesday and Saturday)
         * at 21:45:00 PM.
         */
         MoneyBag.lotto();  
      },
      timeZone: 'America/Los_Angeles'
    });
    lottoJob.start();

    var powerJob = new CronJob({
      cronTime: '00 45 21 * * 3,6',
      onTick: function() {
        /*
         * Runs every (Wednesday and Saturday)
         * at 21:45:00 PM.
         */
         MoneyBag.power();  
      },
      timeZone: 'America/Los_Angeles'
    });
    powerJob.start();

    var megaJob = new CronJob({
      cronTime: '00 59 21 * * 2-5',
      onTick: function() {
        /*
         * Runs every (Tuesday and Friday)
         * at 21:59:00 PM.
         */
         MoneyBag.mega();  
      },
      timeZone: 'America/Los_Angeles'
    });
    megaJob.start();

  }

  module.exports = lotteryCrons;

})();