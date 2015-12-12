//controller for the add song form
app.controller('OptionsCtrl',['$rootScope', "$location", function($rootScope, $location) {

	this.numPlayers = 2;
	this.deckStyle = './static/img/cardBacks/cheetah.gif';
	this.deckStyles =['./static/img/cardBacks/cheetah.gif', './static/img/cardBacks/black.png', './static/img/cardBacks/blue.jpg','./static/img/cardBacks/brown.jpg','./static/img/cardBacks/orange.PNG'];

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
		console.log('trigger pulled');

		$('#optionsCard').addClass('rotated');
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

	this.showRules = function(){};
	this.hideRules = function(){};

	this.selectPlayers = function(numPlaying){
		console.log(numPlaying);
		this.numPlayers = numPlaying;

		this.players = [];

		for (i = 1; i < numPlaying + 1; i++) {
			this.players.push(
				{
				name: "Player " + i,
				score: 0,
				cards: []
				}
			)
		}
	};

	this.selectDeck = function(chosenDeck){
		console.log(chosenDeck);
		this.deckStyle = chosenDeck;
	}

	this.startGame = function(){

		if (this.numPlayers === 2) {
		$location.path( "/play");
		}

	};



}]); //end optionsCtrl