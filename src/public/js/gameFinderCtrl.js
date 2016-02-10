//controller for the add song form
app.controller('GameFinderCtrl',['$rootScope', "$location", 'configSrvs', 'socketSrvs', function($rootScope, $location, config, socket) {

	this.users = [];
	//default deck style
	this.deckStyle = './static/img/cardBacks/blue.jpg';
	//possible deck styles
	this.deckStyles =['./static/img/cardBacks/cheetah.gif', './static/img/cardBacks/black.png', './static/img/cardBacks/blue.jpg','./static/img/cardBacks/brown.jpg','./static/img/cardBacks/orange.PNG'];
	this.currentUserName = config.getUserName();
	this.currentGame = null;
	this.players = [];
	this.availableGames = [];

	this.showGameFinder = function(){

		$('#welcome').hide('slow');
		$('#gameFinder').show('fast');

	};

	this.hideGameFinder = function(){

		$('#gameFinder').hide('slow');
		$('#welcome').show('fast');

	};

	// this.showRules = function(){};
	// this.hideRules = function(){};

	this.generateNewGame = function(num){

		//tell the server to make a new game and wait for more players. Player1 will be the game creator
		socket.emit('newGame', {
      numPlayers: num,
      player1: this.currentUserName
    }, function (result) {
      if (!result) {
        alert('There was an error creating a game');
      } else {
      	console.log(result);

      }
    });
  };

  this.joinGame = function(game){

  		//send a request to join a game, sends the game data and the current user's name
    	socket.emit('joinGame', {gameObj: game, playerName: this.currentUserName }, function (result) {
      if (!result) {
        alert('There was an error joining the game');
      } else {
      	console.log(result);

      }
    }.bind(this));
  };

	//socket recievers
	socket.on('init', function(data) {
		//assign a username
		this.currentUserName = data.name;
		config.setUserName(data.name);
		//get a list of other users
		this.users = data.users;
		//get a list of available games
		this.availableGames = data.games;
	}.bind(this));

	socket.on('send:users', function(data) {
		//update the list ove current users
		this.users = data.users;

	}.bind(this));

	socket.on('send:games', function(data) {
		//update the list of available games
		this.availableGames = data.games;

		if (data.joinedGame) {
			//set the joined game to be the user's current game
			this.currentGame = data.joinedGame;
		}
	}.bind(this));

	socket.on('game:start', function(data) {

		//check if the user is in the game that's starting
		if (data.gameToStart.name == this.currentGame.name) {

		//set up game variables using config factory and change to the gameboard
		config.setUpOnlineGame(data.gameToStart, this.currentUserName);
    $('#welcome').show();
		$location.path( "/online");


		}

	}.bind(this));

}]); //end gameFinderCtrl