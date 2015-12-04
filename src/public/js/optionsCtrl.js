//controller for the add song form
app.controller('OptionsCtrl',['$rootScope', "$location", function($rootScope, $location) {

	this.numPlayers = 2;
	this.player1Name = "Player 1";
	this.player2Name = "Player 2";

	this.startGame = function(){

		if (this.numPlayers === 2) {
		$location.path( "/play2");
		}

	};

}]); //end optionsCtrl