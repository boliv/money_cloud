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
          var pageInfo = $('.winning_number_sm');
          var pageInfoText = pageInfo.html();

          var stripTagsPageInfo = pageInfoText.replace(/<li><span>/g, '').replace(/<\/span><\/li>/g, ',').replace('<li class="mega"><span>', ' mega: ');

          
          var details = $('.draw_games tbody');
          var detailsText = details.html();

          var splitDetailsText = detailsText.split("<td>");
          var winningPrizeRaw = [];
          splitDetailsText.map(function(t){
            // console.log(t);
            // winningPrize.push(t.match(/(\d+( [+ MEGA]*)?|[ MEGA]*)/g));
            winningPrizeRaw.push(t.match(/\d+( [+ MEGA]*)?|[MEGA]{4}/g));
          });
          //winningPrize = winningPrize[0];
          // console.log(winningPrizeRaw);
          var winningPrize = [].concat.apply([],winningPrizeRaw.map(function(w) { return (w != null) ? w.join(',') : '' }));
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

          var winningNumbers = {
            lotteryName: name,
            winningNumbers: winnings
          }

          var winner = new Winner(winningNumbers);
          console.log(winner);
          winner.save();
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