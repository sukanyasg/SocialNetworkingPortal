var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function(req, res) {
	var id = 'none';
	var language = 'en';
	
	database.blogEntries.find({ title:"default.txt"}, function(err, datum) {
		if (err)
			console.log(err);

		console.log();
		
		if (datum) {
			var blog = datum[1];
			res.render('blog/basic', { title: blog.title , language: language, id: id, document: blog.message});
		}
		else
		{
			res.render('blog/basic', { title: 'No default set' , language: language, id: id, document: 'No default document is present in the blog directory'});
		}
	});
	
  
});

router.get('/create', function(req, res) {
	var title = 'Enter your status message';
    res.render('blog/create', { title: title});
});

// router.post('/save', function(req, res) {

// 	var title = req.body.title;
// 	var timestamp = Date();
// 	var blogEntry = {title:title,timestamp:timestamp};
	
// 	database.blogEntries.insert(blogEntry, function(err,datum) {
// 		if (err)
// 		res.send(err);
		
// 		if (datum) {
// 			var blog = datum;
// 			res.render('blog/status', { status: datum.title});
// 		}
// 		else
// 			res.send("duplicate - title");
// 	});
// });
module.exports = router;
