'use strict';

var express = require('express');
var app = express();
var PORT = 3000;

if (process.env.PORT) {
    PORT = process.env.PORT;
}

var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
  // console.log('a user connected');
  socket.on('disconnect', function(){
    // console.log('user disconnected');
  });
});

app.use('/static', express.static(__dirname + '/public'))

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/api/deckOfCards', (req, res) => {
  let cardsApi = require('./lib/cardsApi.js');
  cardsApi.getNewDeck(res);
});

app.get('*', function(req, res){
	res.render('index');
});

io.sockets.on('connection', require('./socket'));


http.listen(PORT, function() {
	console.log("The frontend server is running on port " + PORT);
});

