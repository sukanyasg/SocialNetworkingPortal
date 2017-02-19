var Datastore = require('nedb'),
    fs = require('fs');
var blogDirectory = '/data/blog/articles/';
var blogEntries = new Datastore({ filename: __dirname + '/data/blog.db', autoload: true });
blogEntries.ensureIndex({fieldName: 'timestamp', unique: false});
var articles = fs.readdirSync(__dirname + blogDirectory);
articles.forEach(function(article){
	fs.readFile(__dirname + blogDirectory + article, 'utf8', function(err,contents){ 
		blogEntries.insert({
			title: article,
			likes: 0
		}, function(err,datum) {
		if (datum) {
			console.log("Saved: " + article + " as record " + datum._id);
		  }
		  else
		  {
			console.log("Skipped: " + article);
		  }
		  
		})
	});
});

module.exports = {
    blogEntries: blogEntries
};