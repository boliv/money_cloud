var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var util = require('util');
var app = express();
var port = 8000;

var megaUrl = 'http://www.calottery.com/play/draw-games/superlotto-plus';

request(megaUrl, function(err, resp, body) {
  // pass body into cheerio and then parse the data
  // console.log('body', body);
  var $ = cheerio.load(body);
  // console.log('$', $);
  var pageInfo = $('.winning_number_sm');
  var pageInfoText = pageInfo.html();

  var stripTagsPageInfo = pageInfoText.replace(/<li><span>/g, '').replace(/<\/span><\/li>/g, ',').replace('<li class="mega"><span>', ' mega: ');

  
  var details = $('.draw_games tbody');
  var detailsText = details.html();

  var splitDetailsText = detailsText.split("<td>");
  var winningPrizeRaw = [];
  splitDetailsText.map(function(t){
    console.log(t);
    // winningPrize.push(t.match(/(\d+( [+ MEGA]*)?|[ MEGA]*)/g));
    winningPrizeRaw.push(t.match(/\d+( [+ MEGA]*)?|[MEGA]{4}/g));
  });
  //winningPrize = winningPrize[0];
  // console.log(winningPrizeRaw);
  winningPrize = [].concat.apply([],winningPrizeRaw.map(function(w) { return (w != null) ? w.join(',') : '' }));
  console.log(winningPrize);

  var winnings = {};
    winnings[winningPrize[1]]= winningPrize[3],
    winnings[winningPrize[1]]= winningPrize[3],
    winnings[winningPrize[4]]= winningPrize[6],
    winnings[winningPrize[7]]= winningPrize[9],
    winnings[winningPrize[10]]= winningPrize[12],
    winnings[winningPrize[13]]= winningPrize[15],
    winnings[winningPrize[16]]= winningPrize[18],
    winnings[winningPrize[19]]= winningPrize[21],
    winnings[winningPrize[21]]= winningPrize[24],
    winnings[winningPrize[24]]= winningPrize[27];

  console.log('winnings', winnings);

  /********* PARSE DATA ********{}
  [[ null,
  [ '5 + MEGA' ],
  [ '0' ],
  [ '41', '000', '000' ],
  [ '5' ],
  [ '0' ],
  [ '43', '879' ],
  [ '4 + MEGA' ],
  [ '12' ],
  [ '1', '828' ],
  [ '4' ],
  [ '379' ],
  [ '96' ],
  [ '3 + MEGA' ],
  [ '538' ],
  [ '61' ],
  [ '3' ],
  [ '14', '769' ],
  [ '10' ],
  [ '2 + MEGA' ],
  [ '7', '637' ],
  [ '11' ],
  [ '1 + MEGA' ],
  [ '37', '768' ],
  [ '2' ],
  [ 'MEGA' ],
  [ '59', '051' ],
  [ '1' ] ]
  *******************************/

  /*********** JSON API ***********
  var winnings = {
    '5 + MEGA': '41,000,000',
    '5': '43,879',
    '4 + MEGA': '1,828',
    '4': '96',
    '3 + MEGA': '61',
    '3': '10',
    '2 + MEGA': '11',
    '1 + MEGA': '2',
    'MEGA': '1'
  }
  *****************************/ 
  // var summary = $('.info');
  // var summaryText = summary.text();

  // var job = {
  //   animeTitle: animeTitleText,
  //   summary: summaryText
  // };
// 
  // console.log(pageInfoText);d
  // console.log(stripTagsPageInfo);
});

// get app running
app.listen(port);
console.log('server is listening on ' + port);