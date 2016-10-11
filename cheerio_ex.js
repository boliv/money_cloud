var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var util = require('util');
var app = express();
var port = 8000;

var url = 'http://www.calottery.com/play';

request(url, function(err, resp, body) {
  // pass body into cheerio and then parse the data
  // console.log('body', body);
  var $ = cheerio.load(body);
  // console.log('$', $);
  var pageInfo = $('.number-balls');
  // var animeTitleText = animeTitle.text();

  // var summary = $('.info');
  // var summaryText = summary.text();

  // var job = {
  //   animeTitle: animeTitleText,
  //   summary: summaryText
  // };

  console.log(pageInfo);
  console.log(JSON.stringify(pageInfo, null, 2));
});

// get app running
app.listen(port);
console.log('server is listening on ' + port);