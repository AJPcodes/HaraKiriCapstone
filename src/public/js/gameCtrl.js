app.controller('GameCtrl',['$rootScope', 'cardSrvs', 'configSrvs', '$q', '$location', function($rootScope, cardSrvs, config, $q, $location) {
	//prepare deck
	cardSrvs.prepareNewDeck();
	//card-back style
	this.deckStyle = config.newGame().deckStyle;

	//array that contains the current deck
	this.deck = [];

	//score values for all cards
	this.cardValues = cardSrvs.getCardValues();
// console.log(this.cardValues['AH']);
	//round tracker
	this.currentRound = 1;
	this.players = [];

	//used to dermine who's turn it is
	this.turnsTaken = 0;
	this.roundOver = false;

	//defaults to null until a card is selected in play
	this.selectedCard = null;

	//used turns taken and the number of players to determin who's turn it is.
	this.changePlayer = function(){

			this.currentPlayer = this.players[this.turnsTaken % this.players.length];

	}; //end change player

	//gets game details for a new game
	this.startGame = function(){
		gameData = config.newGame();

		//gets player names and chosen deck style - default names are player1 player2
		this.players = gameData.players;
		this.deckStyle = gameData.deckStyle;

		//note: if the 3rd or forth player don't exist, these values default to null
		this.player1 = this.players[0];//end player 1
		this.player2 = this.players[1];//end player 1
		this.player3 = this.players[2];//end player 1
		this.player4 = this.players[3];//end player 1

		$('#startButton').hide();
		$('#dealButton').show();

		// this.deal();

	}; //end start game

	this.selectCard = function(pile){

		//check if a card has already been drawn and that the round is not over
		if (this.selectedCard === null && this.roundOver === false) {
			//determin which pile is being drawn from
			if (pile === 'deck') {
				this.selectedCard = this.deck.splice(0,1);
			} else if (pile === 'discard') {
				this.selectedCard = this.discard.splice(0,1);
			}
			//if clicking on 'discard' when a card has been drawn, the card will be discaded and the players turn is over
		} else if (pile == 'discard' && this.selectedCard !== null) {

			//add card to discard pile
			this.discard.unshift(this.selectedCard[0]);
			//reset 'flipped' status
			this.discard[0].flipped = null;

			this.selectedCard = null;
			this.turnsTaken += 1;
			//change to next player's turn
			this.changePlayer();
		}
	}; //end selectCard

	//
	this.playCard = function(player, index, playerObj){
		//check that a card is ready to be played by the user who's turn it is.
		//confirm a player is not clicking on an opponent's grid, that there is a selected  card, and that the user isn't trying to replace an already matched card.
		if (playerObj === this.currentPlayer && this.selectedCard !== null && playerObj.cards[index].matched != 'matched') {

			//add card to discard pile
			this.discard.unshift(playerObj.cards[index]);
			//reset 'flipped' status
			this.discard[0].flipped = null;

			playerObj.cards[index] = this.selectedCard.splice(0,1)[0];
			playerObj.cards[index].flipped = "flipped";

			//check if the cards match
			var checkMatch = function(card1, card2, score, cardValues) {
				//if both cards are flipped and match, they get the 'matched class'
				if (card1.flipped === 'flipped' && card2.flipped === 'flipped' && card1.value === card2.value) {
					card1.matched = 'matched';
					card2.matched = 'matched';

				}
			};

			//check for a match for the card played and the other card in its corresponding collumn
			checkMatch(playerObj.cards[index], playerObj.cards[(index+3)%6], this.cardValues);

			//reset selected card
			this.selectedCard = null;
			this.turnsTaken += 1;
			//change to next player's turn
			this.changePlayer();
			//check how many cards are 'flipped'
			this.checkStatus();
		}

	}; //end play card


	//check how many cards are flipped for each player to determine if game should end
	this.checkStatus = function(){

			var roundOver = false;
		this.players.forEach(function(player){

			var numFlipped = 0;
			player.cards.forEach(function(card){

		//when one player has 6 flipped cards the round ends
				if (card.flipped === "flipped")
					numFlipped++;
				if (numFlipped === 6) {
					roundOver = true;
				}

			});

			}.bind(this));

		if (roundOver) {
			this.scoreRound();
		}
	};

	//function to deal a new hand
	this.deal = function(){

		var dealCards = function(){
		this.deck = cardSrvs.getNewDeck();
		this.selectedCard = null;

		//deal three cards to each player, 2 face up
		this.players.forEach(function(player){
				player.cards = this.deck.splice(0,6);
			for (i=0; i<2;i++) {
				player.cards[i].flipped = "flipped";
			}
		}.bind(this));

		//put the first card on the discard pile
		this.discard = this.deck.splice(0,1);
		//prepare the next deck
		cardSrvs.prepareNewDeck();
		}.bind(this);

		dealCards();
		this.changePlayer();
		this.roundOver = false;
		$('#dealButton').hide('slow');


	};

	this.scoreRound = function() {

		$('#dealButton').show('slow');

		$.each(this.players, function(index, player){

			var score = 0;

			$.each(player.cards, function(index, card){

				//all cards are immediately flipped
				card.flipped = "flipped";
				//score is calculated from all non matched cards
				if(card.matched != 'matched') {
				score += this.cardValues[card.code].score;
				}

			}.bind(this));  //end flipped check

			player.score += score;

		}.bind(this)); //

			this.roundOver = true;
			this.currentRound += 1;

			//if 9 rounds have been played, end the game
			if (this.currentRound > 9) {
			this.endGame();
			}

	};

	this.endGame = function(){
		// console.log('endGame called');

		this.winner = this.player1;
		//check for lowest score
		this.players.forEach(function(player){
			if (player.score < this.winner.score) {
				this.winner = player;
			}

		}.bind(this));

	$('#dealButton').hide();
	$('#startButton').hide();
	$('#winner').show('slow');

	};

	this.backHome = function(){

		$location.path( "/");

	};


}]); //end gameCtrl



