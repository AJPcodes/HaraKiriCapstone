'use strict';

const express = require('express');
const app = express();
const cardsApi = require('./lib/cardsApi.js');
const http = require('http').Server(app);
const io = require('socket.io')(http);

let PORT = 3000;

if (process.env.PORT) {
  PORT = process.env.PORT;
}
cardsApi.prepareNewDeck();

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
  cardsApi.getNewDeck(res);
});

app.get('*', function(req, res){
	res.render('index');
});

io.sockets.on('connection', require('./socket'));


http.listen(PORT, function() {
	console.log("The frontend server is running on port " + PORT);
});

