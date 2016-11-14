(function () {
  'use strict';

    var request = require('request');
    var cheerio = require('cheerio');
  	
    var moneyBag = function(Winner){
  		
      var mega = function(){
        winnersParser('http://www.calottery.com/play/draw-games/mega-millions', 'mega');
  		}

  		var power = function(){
        winnersParser('http://www.calottery.com/play/draw-games/powerball', 'power');
  		}

      var lotto = function(){
        winnersParser('http://www.calottery.com/play/draw-games/superlotto-plus', 'lotto');
      }

      // Helper function

      var winnersParser = function(url, name){

        request(url, function(err, resp, body) {
          // pass body into cheerio and then parse the data
          // console.log('body', body);
          var $ = cheerio.load(body);
          // console.log('$', $);

          /*********** WINNINGDATE ***************/
          var dateDrawRaw = $('.date');
          var dateDrawRawDOM = dateDrawRaw.html();
          var dateDrawOnly = dateDrawRawDOM.split('|');
          var winningDate = dateDrawOnly[0].trim();


          /*********** WINNING NUMBERS ***************/
          var pageInfo = $('.winning_number_sm');
          var pageInfoText = pageInfo.html();

          var stripTagsPageInfo = pageInfoText.replace(/<li><span>/g, '').replace(/<\/span><\/li>/g, ',').replace('<li class="mega"><span>', ' mega: ');

          
          var splitWinningNumbers = stripTagsPageInfo.split(",");
          var winningNumbers = [];
          splitWinningNumbers.forEach(function(n) {
            winningNumbers.push(n.match(/\d+/g));
          });

          winningNumbers = [].concat.apply([], winningNumbers);
          winningNumbers.pop();

          //console.log(winningNumbers);
          

          /*********** WINNING PRIZE ***************/
          var details = $('.draw_games tbody');
          var detailsText = details.html();

          //console.log(detailsText);

          var splitDetailsText = detailsText.split("<td>");
          var winningPrizeRaw = [];
          splitDetailsText.map(function(t){
            // console.log(t);
            // winningPrize.push(t.match(/(\d+( [+ MEGA]*)?|[ MEGA]*)/g));
            winningPrizeRaw.push(t.match(/\d+( [+ MEGA]*)?|[MEGA]{4}/g));
          });
          //winningPrize = winningPrize[0];
          // console.log(winningPrizeRaw);
          var prize = [].concat.apply([],winningPrizeRaw.map(function(w) { return (w != null) ? w.join(',') : '' }));
          //console.log(winningPrize);

          var winnings = {};
            winnings[prize[1]]= prize[3],
            winnings[prize[1]]= prize[3],
            winnings[prize[4]]= prize[6],
            winnings[prize[7]]= prize[9],
            winnings[prize[10]]= prize[12],
            winnings[prize[13]]= prize[15],
            winnings[prize[16]]= prize[18],
            winnings[prize[19]]= prize[21],
            winnings[prize[21]]= prize[24],
            winnings[prize[24]]= prize[27];

          console.log('winningPrize', winnings);

          console.log('winningNumbers', winningNumbers);

          var data = {
            lotteryName: name,
            winningDate: winningDate,
            winningPrizes: winnings,
            winningNumbers: winningNumbers
          }

          var winner = new Winner(data);
          
          console.log('winner', winner);
          
          winner.save(function (err) {
                    console.log(err);
                });
        })
      }

  		return {
  			mega:mega,
  			power:power,
        lotto:lotto
  		}
  	}

  	module.exports = moneyBag;

})();