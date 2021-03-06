//controller for the add song form
app.controller('OptionsCtrl',['$rootScope', "$location", 'configSrvs', 'socketSrvs', function($rootScope, $location, config, socket) {

	this.users = [];
	this.numPlayers = 2;
	this.deckStyle = './static/img/cardBacks/blue.jpg';
	this.deckStyles =['./static/img/cardBacks/cheetah.gif', './static/img/cardBacks/black.png', './static/img/cardBacks/blue.jpg','./static/img/cardBacks/brown.jpg','./static/img/cardBacks/orange.PNG'];
	this.currentUserName = config.getUserName();
	this.players = [
	{
		name: "Player 1",
		score: 0,
		cards: []
	},
	{
		name: "Player 2",
		score: 0,
		cards: []
	}

	];


	this.animateCards = function(){

		$('#optionsCard').addClass('rotated');

		//fan cards after rotation
		$('#optionsCard').on('transitionend webkitTransitionEnd', function() {

		$('#card1').addClass('fan');
		$('#card2').addClass('fan');
		$('#card3').addClass('fan');


		});
	};

	this.showOptions = function(){

		$('#welcome').hide('slow');
		$('#options').show('fast');

	};

	this.hideOptions = function(){

		$('#options').hide('slow');
		$('#welcome').show('fast');

	};


	this.showGameFinder = function(){

		$('#welcome').hide('slow');
		$('#gameFinder').show('fast');

	};

	this.hideGameFinder = function(){

		$('#gameFinder').hide('slow');
		$('#welcome').show('fast');

	};

	this.showRules = function(){

		$('#welcome').hide('slow');
		$('#rules').show('fast');

	};
	this.hideRules = function(){

		$('#rules').hide('slow');
		$('#welcome').show('fast');


	};

	this.selectPlayers = function(numPlaying){
		// console.log(numPlaying);
		this.numPlayers = numPlaying;

		this.players = [];

		for (i = 1; i < numPlaying + 1; i++) {
			this.players.push(
				{
				name: "Player " + i,
				score: 0,
				cards: []
				});
		}
	};

	this.selectDeck = function(chosenDeck){
		// console.log(chosenDeck);
		this.deckStyle = chosenDeck;
		config.setDeckStyle(chosenDeck);
	};

	this.startGame = function(){

		config.setUpGame({
			players: this.players,
			deckStyle: this.deckStyle
		});
		$location.path( "/play");

	};

	this.toggleNameInput = function(){
		$('#options input').toggle('display');

	};

// socket.on('send:name', function(data) {
// 	this.currentUserName = data.name;
// 	console.log('name recieved');
// 	config.setUserName(data.name);
// 	this.users = data.users;

// }.bind(this));

socket.on('send:users', function(data) {
	// console.log('new user data', data);

	this.users = data.users;

}.bind(this));


}]); //end optionsCtrl