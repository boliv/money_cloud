var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var util = require('util');
var app = express();
var port = 8000;

// var url = 'http://www.calottery.com/play';
var megaUrl = 'http://www.calottery.com/play/draw-games/mega-millions';

request(megaUrl, function(err, resp, body) {
  // pass body into cheerio and then parse the data
  // console.log('body', body);
  var $ = cheerio.load(body);
  // console.log('$', $);
  var pageInfo = $('.winning_number_sm');
  var pageInfoText = pageInfo.html();

  var stripTagsPageInfo = pageInfoText.replace(/<li><span>/g, '').replace(/<\/span><\/li>/g, ',').replace('<li class="mega"><span>', ' mega: ');

  // var summary = $('.info');
  // var summaryText = summary.text();

  // var job = {
  //   animeTitle: animeTitleText,
  //   summary: summaryText
  // };

  console.log(pageInfoText);
  console.log(stripTagsPageInfo);
});

// get app running
app.listen(port);
console.log('server is listening on ' + port);