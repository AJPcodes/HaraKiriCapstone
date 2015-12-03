'use strict'

var express = require('express'),
		posts = require('./mock/posts.json');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/blog/:title?', function(req, res){
	var title = req.params.title;
	var post = posts[title];
	if (post === undefined) {
		res.status(503);
		res.send("<h1>Whoops. Blog post not found.</h1>");
	} else {
		res.render('post', {post: post});
	}
});

app.listen(3000, function(){
console.log('Serving up frontend server on Vagrant port 3000')
});

