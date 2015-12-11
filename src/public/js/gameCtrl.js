app.controller('GameCtrl',['$rootScope', 'cardSrvs', '$q', function($rootScope, cardSrvs, $q) {

	//card-back style
	this.deckStyle = "./static/img/cardBacks/cheetah.gif";

	//array that contains the current deck
	this.deck = [];

	//score values for all cards
	this.cardValues = cardSrvs.getCardValues();
// console.log(this.cardValues['AH']);
	//round tracker
	this.currentRound = 1;

	this.player1 = {
		name: "Player 1",
		score: 0,
		cards: []
	}; //end player 1

	this.player2 = {
		name: "Player 2",
		score: 0,
		cards: []
	}; //end player 2

	//used to dermine who's turn it is
	this.turnsTaken = 0;

	//defaults to null until selected in play
	this.selectedCard = null;

	//used turns taken to determin who's turn it is.
	this.changePlayer = function(){
		if (this.turnsTaken%2 === 0 ) {
			this.currentPlayer = this.player1;
			$('.player1').addClass('active');
			$('.player2').removeClass('active');

		} else {
			this.currentPlayer = this.player2;
			$('.player2').addClass('active');
			$('.player1').removeClass('active');
		}
	}; //end change player

	this.selectCard = function(pile){

		if (this.selectedCard === null) {

			if (pile === 'deck') {
				this.selectedCard = this.deck.splice(0,1);
			} else if (pile === 'discard') {
				this.selectedCard = this.discard.splice(0,1);
			}
		}
	}; //end selectCard

	//function that flips a players's card at a specified index

	this.playCard = function(player, index, playerObj){
		// console.log('Flipping:', player, index);
		if (playerObj === this.currentPlayer && this.selectedCard !== null) {

			//add card to discard pile
			this.discard.unshift(playerObj.cards[index]);
			//reset 'flipped' status
			this.discard[0].flipped = null;

			playerObj.cards[index] = this.selectedCard.splice(0,1)[0];
			playerObj.cards[index].flipped = "flipped";
			this.selectedCard = null;
			this.turnsTaken += 1;
			//change to next player's turn
			this.changePlayer();
			//check how many cards are 'flipped'
			this.checkStatus();
		}

		// $('#'+player+index).toggleClass('flipped');
	};

	//check how many cards are flipper for each player to determine if game should end
	this.checkStatus = function(){

		//when one player shows 6 flipped cards the round ends
		if ($('.player2Cards .flipped').length === 6 || $('.player1Cards .flipped').length === 6) {
		this.scoreRound();
		}
	};

	//function to deal a new hand
	this.deal = function(){
		var dealCards = function(){
		this.deck = cardSrvs.getNewDeck();
		this.selectedCard = null;
		this.player1.cards = this.deck.splice(0,6);
		this.player2.cards = this.deck.splice(0,6);

		for (i=0; i<3;i++) {
			this.player1.cards[i].flipped = "flipped";
			this.player2.cards[i].flipped = "flipped";
		}

		this.discard = this.deck.splice(0,1);
		cardSrvs.prepareNewDeck();
		}.bind(this);

		dealCards();
		this.changePlayer();
		$('#dealButton').hide('slow');


	};

	this.scoreRound = function() {

		var score1 = 0;
		var score2 = 0;

		//add card scores for player 1
		$.each(this.player1.cards, function(index, card){
			// console.log(card);
			card.flipped = "flipped";
			score1 += this.cardValues[card.code].score;
			console.log(score1);
		}.bind(this));

		//add score cards for player 2
		$.each(this.player2.cards, function(index, card){
			// console.log(card);
			card.flipped = "flipped";
			score2 += this.cardValues[card.code].score;

			console.log(score1);
		}.bind(this));

		var checkMatch = function(card1, card2, score, cardValues) {
			if (card1.value === card2.value) {
				console.log('match!', card1.value);
				console.log(score);
				score -= cardValues[card1.code].score * 2;
				return score;
			}

			return score;
		};

		//check player 1 matches
		score1 = checkMatch(this.player1.cards[0], this.player1.cards[3], score1, this.cardValues);
		score1 = checkMatch(this.player1.cards[1], this.player1.cards[4], score1, this.cardValues);
		score1 = checkMatch(this.player1.cards[2], this.player1.cards[5], score1, this.cardValues);

		//check player 2 matches
		score2 = checkMatch(this.player2.cards[0], this.player2.cards[3], score2, this.cardValues);
		score2 = checkMatch(this.player2.cards[1], this.player2.cards[4], score2, this.cardValues);
		score2 = checkMatch(this.player2.cards[2], this.player2.cards[5], score2, this.cardValues);

		this.player1.score += score1;
		this.player2.score += score2;
		this.currentRound += 1;
		$('#dealButton').show('slow');

	};





}]); //end optionsCtrl




