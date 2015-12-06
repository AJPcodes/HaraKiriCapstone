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

	this.currentPlayer = "player1";
	this.selectedCard = null;

	//function that flips a players's card at a specified index
	this.flipCard = function(player, index){
		console.log('Flipping:', player, index);
		$('#'+player+index).toggleClass('flipped');
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
		console.log($('.'+this.currentPlayer));
		}.bind(this);

		dealCards();

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




