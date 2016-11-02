(function () {
  "use strict";

  var mongoose = require("mongoose"),
      Schema = mongoose.Schema;

  var winnerModel = new Schema({
      lotteryName: {type: String, unique: true, index: true},
      winningPrizes: {type: Object},
      winningNumbers: {type: Array},
      drawDate: {type: Date, default: Date.now}
  });

  /************* DB ************
  {
    "lotteryName": "Mega",
    "10-12-16": {
      "winningPrizes": {
            "5 + MEGA": "41,000,000",
            "5": "43,879",
            "4 + MEGA": "1,828",
            "4": "96",
            "3 + MEGA": "61",
            "3": "10",
            "2 + MEGA": "11",
            "1 + MEGA": "2",
            "MEGA": "1"
      },
      "winningNumbers": [

      ]
    }
  },
  {
    "lotteryName": "Mega",
    "10-18-16": {
      "winningPrizes": {  
            "5 + MEGA": "41,000,000",
            "5": "43,879",
            "4 + MEGA": "1,828",
            "4": "96",
            "3 + MEGA": "61",
            "3": "10",
            "2 + MEGA": "11",
            "1 + MEGA": "2",
            "MEGA": "1"
      },
      "winningNumbers": [

      ]
    },
  {
    lotteryName: "Power Ball"
  },
  {
    lotteryName: "Lottery"
  }


  ******************************/ 

  /******
  TODO:
  if the winning number is not in our db, we need to create a query based on the user"s search date
  *********/ 

  module.exports = mongoose.model("Winner", winnerModel);

})();