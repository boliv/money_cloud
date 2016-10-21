(function () {
  "use strict";

  var mongoose = require("mongoose"),
      Schema = mongoose.Schema;

  var winnerModel = new Schema({
      lotteryName: {type: String, unique: true, index: true},
      winningNumbers: {type: Object}
  });

  /************* DB ************
  {
    "lotteryName": "Mega"
    "winningNumbers": {
      {
        "10-12-16": {
          "5 + MEGA": "41,000,000",
          "5": "43,879",
          "4 + MEGA": "1,828",
          "4": "96",
          "3 + MEGA": "61",
          "3": "10",
          "2 + MEGA": "11",
          "1 + MEGA": "2",
          "MEGA": "1"
        }
      }
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