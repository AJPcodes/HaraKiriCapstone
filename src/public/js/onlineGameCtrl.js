app.controller('OnlineGameCtrl',['$rootScope', 'cardSrvs', 'configSrvs', '$q', 'socketSrvs',  function($rootScope, cardSrvs, config, $q, socket) {

	//hide buttons until needed
		$('#startButton').hide();
		$('#dealButton').hide();
//function to send the current state of the game to other users.
	this.sendGameData = function(){

		var gameData = {
			name: this.gameName,
			deck: this.deck,
			currentRound: this.currentRound,
			players: this.players,
			turnsTaken: this.turnsTaken,
			selectedCard: this.selectedCard,
			discard: this.discard,
			currentPlayer: this.currentPlayer
		};

		socket.emit('send:gameData', gameData, function (result) {
      if (!result) {
        alert('There was an error communicating with the server');
      } else {
      	console.log(result);

      }
    });

	};

//function to recieve game data
socket.on('receive:gameData', function (data) {
	console.log(data);
	console.log(this.gameName);
	console.log(data.name);
	if (this.gameName == data.name) {
			this.deck = data.deck;
			this.currentRound = data.currentRound;
			this.players = data.players;
			this.player1 = this.players[0];//end player 1
			this.player2 = this.players[1];//end player 1
			this.player3 = this.players[2];//end player 1
			this.player4 = this.players[3];//end player 1
			this.turnsTaken = data.turnsTaken;
			this.selectedCard = data.selectedCard;
			this.discard = data.discard;
			this.currentPlayer = data.currentPlayer;
	if (this.currentRound > 9) {
		this.endGame();
	}
		$('.playerDisplay h2').removeClass('highlighted');
		console.log($('#' + this.currentPlayer.name));
		$('.' + this.currentPlayer.name).addClass('highlighted');
	}

  }.bind(this));


	//card-back style
	this.deckStyle = './static/img/cardBacks/brown.jpg';

	//array that contains the current deck
	this.deck = [];

	//score values for all cards
	this.cardValues = cardSrvs.getCardValues();
// console.log(this.cardValues['AH']);
	this.currentUser = config.newOnlineGame().userName;
	//round tracker
	this.currentRound = 1;
	this.currentPlayer = '';

 	//game name
 	this.gameName = config.newOnlineGame().name;
	this.playerNames = config.newOnlineGame().players;

	this.players = [];

	$.each(this.playerNames, function(index, playerName){
		this.players.push({
			name: playerName,
			score: 0,
		cards: []
		});
	}.bind(this));


	// $('#dealButton').show();


	//used to dermine who's turn it is
	this.turnsTaken = 0;

	//defaults to null until selected in play
	this.selectedCard = null;

	//used turns taken to determin who's turn it is.
	this.changePlayer = function(){

		this.currentPlayer = this.players[this.turnsTaken % this.players.length];
					//emit data
		this.sendGameData();

		$('.playerDisplay h2').removeClass('highlighted');
		$('.' +this.currentPlayer.name).addClass('highlighted');

	}; //end change player

	this.startGame = function(){

		this.player1 = this.players[0];//end player 1
		this.player2 = this.players[1];//end player 1
		this.player3 = this.players[2];//end player 1
		this.player4 = this.players[3];//end player 1

		$('#startButton').hide();
		// $('#dealButton').hide();

		this.deal();

	};

	this.selectCard = function(pile){

		if (this.selectedCard === null && this.currentUser === this.currentPlayer.name) {

			if (pile === 'deck') {
				this.selectedCard = this.deck.splice(0,1);
			} else if (pile === 'discard') {
				this.selectedCard = this.discard.splice(0,1);
			}
					//emit data
		this.sendGameData();
		} else if (pile == 'discard' && this.selectedCard !== null && this.currentUser === this.currentPlayer.name) {

			//add card to discard pile
			this.discard.unshift(this.selectedCard[0]);
			//reset 'flipped' status
			this.discard[0].flipped = null;

			this.selectedCard = null;
			this.turnsTaken += 1;
			//change to next player's turn
			this.changePlayer();
					//emit data
		this.sendGameData();
		}
	}; //end selectCard

	//function that flips a players's card at a specified index

	this.playCard = function(player, index, playerObj){
		// console.log('Flipping:', player, index);
		if (playerObj.name === this.currentPlayer.name && this.currentUser === this.currentPlayer.name && this.selectedCard !== null && playerObj.cards[index].matched != 'matched') {

			//add card to discard pile
			this.discard.unshift(playerObj.cards[index]);
			//reset 'flipped' status
			this.discard[0].flipped = null;

			playerObj.cards[index] = this.selectedCard.splice(0,1)[0];
			playerObj.cards[index].flipped = "flipped";

			//check if the cards match
			var checkMatch = function(card1, card2, score, cardValues) {
				if (card1.flipped === 'flipped' && card2.flipped === 'flipped' && card1.value === card2.value) {
					card1.matched = 'matched';
					card2.matched = 'matched';

				}
						//emit data
			};

			checkMatch(playerObj.cards[index], playerObj.cards[(index+3)%6], this.cardValues);


			this.selectedCard = null;
			this.turnsTaken += 1;
			//change to next player's turn
			this.changePlayer();
			//check how many cards are 'flipped'
			this.checkStatus();
		}

		// $('#'+player+index).toggleClass('flipped');
				//emit data
		this.sendGameData();
	};

	this.discardCard = function(){

			if (this.selectedCard !== null && this.currentUser === this.currentPlayer.name) {

			//add card to discard pile
			this.discard.unshift(this.selectedCard);
			//reset 'flipped' status
			this.discard[0].flipped = null;

			this.selectedCard = null;
			this.turnsTaken += 1;
			//change to next player's turn
			this.changePlayer();
		}
				//emit data
		this.sendGameData();
	};



	//check how many cards are flipper for each player to determine if game should end
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


		this.discard = this.deck.splice(0,1);
		cardSrvs.prepareNewDeck();
		}.bind(this);

		dealCards();
		this.changePlayer();
		$('#dealButton').hide('slow');

		//emit data
		this.sendGameData();
	};


	this.scoreRound = function() {

			$('#dealButton').show('slow');

		$.each(this.players, function(index, player){

			var score = 0;

			$.each(player.cards, function(index, card){
				// console.log(card);
				// console.log(card);
				card.flipped = "flipped";
				if(card.matched != 'matched') {
				score += this.cardValues[card.code].score;
				}

			}.bind(this));  //end flipped check

			player.score += score;

		}.bind(this)); //

			this.currentRound += 1;
			if (this.currentRound > 9) {
			this.endGame();
			}

					//emit data
		this.sendGameData();
	};

	this.endGame = function(){

		var winner = this.player1;
		this.players.forEach(function(player){

			if (player.score > winner.score) {
				winner = player;
			}

		});

		alert('The winner is: ' + winner.name);


	};

//initalize game on load
	if (this.currentUser == this.players[1].name) {
		$('#startButton').show();

}


}]); //end gameCtrl



