app.controller('GameCtrl',['$rootScope', 'cardSrvs', '$q', function($rootScope, cardSrvs, $q) {

	//card-back style
	this.deckStyle = "http://www.cheetahplayingcards.com/images/cheetah-card.gif";

	//array that contains the current deck
	this.deck = [];


	this.gameTracker = {
		round: 0,
	}

	this.player1 = {
		name: "Player 1",
		score: 0,
		cards: []
	} //end player 1

	this.player2 = {
		name: "Player 2",
		score: 0,
		cards: []
	} //end player 2

	this.turnsTaken = 0;
	this.selectedCard = null;

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
	}

	//function that flips a players's card at a specified index
	this.playCard = function(player, index, playerObj){
		// console.log('Flipping:', player, index);
		if (playerObj === this.currentPlayer && this.selectedCard != null) {

			this.discard.unshift(playerObj.cards[index]);
			playerObj.cards[index] = this.selectedCard.splice(0,1)[0];
			playerObj.cards[index].flipped = "flipped";
			this.selectedCard = null;
			this.turnsTaken += 1;
			this.changePlayer();

		}

		// $('#'+player+index).toggleClass('flipped');
		this.checkStatus();
	};

	//check how many cards are flipper for each player
	this.checkStatus = function(){

		console.log($('.player1Cards .flipped').length);
		console.log($('.player2Cards .flipped').length);

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

	};

	this.selectCard = function(pile){

		if (this.selectedCard === null) {

			if (pile === 'deck') {
				this.selectedCard = this.deck.splice(0,1);
			} else if (pile === 'discard') {
				this.selectedCard = this.discard.splice(0,1);
			}
		}
	}; //end selectCard


}]); //end optionsCtrl




