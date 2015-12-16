//controller for the add song form
app.controller('GameFinderCtrl',['$rootScope', "$location", 'configSrvs', 'socketSrvs', function($rootScope, $location, config, socket) {

	this.users = [];
	this.deckStyle = './static/img/cardBacks/blue.jpg';
	this.deckStyles =['./static/img/cardBacks/cheetah.gif', './static/img/cardBacks/black.png', './static/img/cardBacks/blue.jpg','./static/img/cardBacks/brown.jpg','./static/img/cardBacks/orange.PNG'];
	this.currentUserName = '';
	this.players = [];
	this.availableGames = [];


	// this.animateCards = function(){
	// 	console.log('trigger pulled');

	// 	$('#optionsCard').addClass('rotated');
	// 	$('#optionsCard').on('transitionend webkitTransitionEnd', function() {
	// 	$('#card1').addClass('fan');
	// 	$('#card2').addClass('fan');
	// 	$('#card3').addClass('fan');


	// 	});
	// };

	this.showGameFinder = function(){

		$('#welcome').hide('slow');
		$('#gameFinder').show('fast');

	};

	this.hideGameFinder = function(){

		$('#gameFinder').hide('slow');
		$('#welcome').show('fast');

	};

	this.showRules = function(){};
	this.hideRules = function(){};

	this.generateNewGame = function(num){
		socket.emit('newGame', {
      numPlayers: num,
      player1: this.currentUserName
    }, function (result) {
      if (!result) {
        alert('There was an error creating a game');
      } else {

      }
    });
  };
	//socket recievers
	socket.on('init', function(data) {
		this.currentUserName = data.name;
		this.users = data.users;
		this.availableGames = data.games;
	}.bind(this));

	socket.on('send:users', function(data) {
		this.users = data.users;

	}.bind(this));

	socket.on('send:games', function(data) {
		console.log('received', data);
		this.availableGames = data.games;
	}.bind(this));





}]); //end gameFinderCtrl