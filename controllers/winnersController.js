(function () {
  'use strict';

  	var winnersController = function(Winner){
  		var get = function(req,res){
  			var query = {};

  			query = req.query;

  			Winner.find(query, function(err,winners){
  				if(err)
  					res.status(500).send(err);
  				else
  					res.json(winners);
  			});
  		}

  		var post = function(req,res){
  			var winner = new Winner(req.body);

  			winner.save();
            console.log('POST host', winner);
            res.send(winner);
  			// if(!req.body.winnings){

  			// }
  		}

  		return {
  			get:get,
  			post:post
  		}
  	}

  	module.exports = winnersController;

})();