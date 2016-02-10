"use strict";
var availableGames = [];
var usedGameNames = [];

var claim = function (gameName) {
  if (!gameName || usedGameNames.indexOf(gameName) !== -1) {
    return false;
  } else {
    usedGameNames.push(gameName);
    return true;
  }
};

// find the lowest unused  game name and claim it
var assignGameName = function (data) {
  var newGameName,
    nextId = 1;

  do {
    newGameName = data.numPlayers + ' Player Game #' + nextId;
    nextId += 1;
  } while (!claim(newGameName));

  var newGameObj = {name: newGameName,
    type: data.numPlayers,
    players: [data.player1]};


  availableGames.push(newGameObj);

  return newGameObj;

};
// serialize claimed names as an array
var get = function () {
  return availableGames;
};

var removeGame = function(gameName){

  for (let i=0;i<availableGames.length;i++) {
    var game = availableGames[i];

    if (game.name == gameName) {
      availableGames.splice(i, 1);
    }

  }

}
//funtion to update the players currently in a game
var updateGame = function(gameToUpdate){
  console.log('update players called');

  for (let i=0;i<availableGames.length;i++) {
    var game = availableGames[i];
    if (game.name == gameToUpdate.name) {
      game = gameToUpdate;
    }

  }

};

var free = function (name) {
  if (usedGameNames.indexOf(name) !== -1) {
    usedGameNames.splice(usedGameNames.indexOf(name), 1);
  }
};

module.exports = {
    claim: claim,
    free: free,
    get: get,
    assignGameName: assignGameName,
    updateGame: updateGame,
    removeGame: removeGame
};

