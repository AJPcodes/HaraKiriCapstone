"use strict";
const request = require('request');

var newDeck = [];

generateDeck = function(){

  let newDeckUrl = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4';
  request.get(newDeckUrl)
    .on('response', function(response) {
      let shuffleDeckUrl = 'http://deckofcardsapi.com/api/deck/' +response.data.deck_id +'/draw/?count=208'
      request.get(shuffleDeckUrl)
        .on('response', function(response2){
          newDeck = response.data.cards;
      });
  });  //end getNewDeck
};

//immediately generate a usable deck
generateDeck();

//oject that stores all card values for use in scoring
var cardValues = {
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
};


module.exports = {

    getNewDeck: function(res){
      res.send(newDeck);
    },

    prepareNewDeck: function(){
      generateDeck();
    },

    getCardValues: function(){
      return cardValues;
    }

}; //end exports

