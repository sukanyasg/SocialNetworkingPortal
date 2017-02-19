var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function(req, res) {

database.blogEntries.find({}).sort({ timestamp: -1 }).skip(0).limit(5).exec(function (err, datum) 
 {  
 	if (err)
	{
		
		console.log(err);
		next(); 
	}
	
	if (datum && datum[0] ) {

		for(var i=0; i<datum.length; i++) {

			var array = [];
			array.push(datum[i]); 
		}
						
		res.render('blog/basic', { heading: "Last 5 status messages", firstStatus: datum[0].title, secondStatus: datum[1].title, thirdStatus: datum[2].title, fourthStatus: datum[3].title, fifthStatus: datum[4].title});
	}
	else
	{
		
		next();
	}
	});
});

module.exports = router;
