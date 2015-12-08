app.controller('GameCtrl',['$rootScope', 'cardSrvs', '$q', function($rootScope, cardSrvs, $q) {

	//card-back style
	this.deckStyle = "http://www.cheetahplayingcards.com/images/cheetah-card.gif";

	//array that contains the current deck
	this.deck = [];


	this.currentRound = 1;

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

	//check how many cards are flipper for each player
	this.checkStatus = function(){

		console.log($('.player1Cards .flipped').length);
		console.log($('.player2Cards .flipped').length);
		if ($('.player2Cards .flipped').length === 6 || $('.player1Cards .flipped').length === 6)

		this.scoreGame();

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



this.cardValues = {
	"AH": {
		type: "Ace",
		score: 1,
	},
	"2H": {
		type: "2",
		score: -2,
	},
	"3H": {
		type: "3",
		score: 3,
	},
	"4H": {
		type: "4",
		score: 4,
	},
	"5H": {
		type: "5",
		score: 5,
	},
	"6H": {
		type: "6",
		score: 6,
	},
	"7H": {
		type: "7",
		score: 7,
	},
	"8H": {
		type: "8",
		score: 8,
	},
	"9H": {
		type: "9",
		score: 9,
	},
	"0H": {
		type: "10",
		score: 10,
	},
	"JH": {
		type: "Jack",
		score: 10,
	},
	"QH": {
		type: "Queen",
		score: 10,
	},
	"KH": {
		type: "King",
		score: 10,
	},
	"AD": {
		type: "Ace",
		score: 1,
	},
	"2D": {
		type: "2",
		score: -2,
	},
	"3D": {
		type: "3",
		score: 3,
	},
	"4D": {
		type: "4",
		score: 4,
	},
	"5D": {
		type: "5",
		score: 5,
	},
	"6D": {
		type: "6",
		score: 6,
	},
	"7D": {
		type: "7",
		score: 7,
	},
	"8D": {
		type: "8",
		score: 8,
	},
	"9D": {
		type: "9",
		score: 9,
	},
	"0D": {
		type: "10",
		score: 10,
	},
	"JD": {
		type: "Jack",
		score: 10,
	},
	"QD": {
		type: "Queen",
		score: 10,
	},
	"KD": {
		type: "King",
		score: 10,
	},
	"AC": {
		type: "Ace",
		score: 1,
	},
	"2C": {
		type: "2",
		score: -2,
	},
	"3C": {
		type: "3",
		score: 3,
	},
	"4C": {
		type: "4",
		score: 4,
	},
	"5C": {
		type: "5",
		score: 5,
	},
	"6C": {
		type: "6",
		score: 6,
	},
	"7C": {
		type: "7",
		score: 7,
	},
	"8C": {
		type: "8",
		score: 8,
	},
	"9C": {
		type: "9",
		score: 9,
	},
	"0C": {
		type: "10",
		score: 10,
	},
	"JC": {
		type: "Jack",
		score: 10,
	},
	"QC": {
		type: "Queen",
		score: 10,
	},
	"KC": {
		type: "King",
		score: 10,
	},
	"AS": {
		type: "Ace",
		score: 1,
	},
	"2S": {
		type: "2",
		score: -2,
	},
	"3S": {
		type: "3",
		score: 3,
	},
	"4S": {
		type: "4",
		score: 4,
	},
	"5S": {
		type: "5",
		score: 5,
	},
	"6S": {
		type: "6",
		score: 6,
	},
	"7S": {
		type: "7",
		score: 7,
	},
	"8S": {
		type: "8",
		score: 8,
	},
	"9S": {
		type: "9",
		score: 9,
	},
	"0S": {
		type: "10",
		score: 10,
	},
	"JS": {
		type: "Jack",
		score: 10,
	},
	"QS": {
		type: "Queen",
		score: 10,
	},
	"KS": {
		type: "King",
		score: 10,
	}
}

}]); //end optionsCtrl




