// Keep track of which names are used so that there are no duplicates
var userNames = (function () {
  var names = [];

  var claim = function (name) {
    if (!name || names.indexOf(name) !== -1 ) {
      return false;
    } else {
      names.push(name);
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var newGuestName,
      nextUserId = 1;

    do {
      newGuestName = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(newGuestName));

    return newGuestName;
  };

  // serialize claimed names as an array
  var get = function () {
    return names;
  };

  var free = function (name) {
    if (names.indexOf(name) !== -1) {
      names.splice(names.indexOf(name), 1);
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());


// Keep track of which games and avoid duplicates
var allGames = (function () {
	var availableGames = [];
  var usedGameNames = [];
  var currentGames = [];

  var claim = function (gameName) {
    if (!gameName || usedGameNames.indexOf(gameName) !== -1 || currentGames.indexOf(gameName) !== -1 ) {
      return false;
    } else {
      usedGameNames.push(gameName);
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
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

    for (i=0;i<availableGames.length;i++) {
      var game = availableGames[i];

      if (game.name == gameName) {
        availableGames.splice(i, 1);
      }

    }

  }
  //funtion to update the players currently in a game
  var updateGame = function(gameToUpdate){
    console.log('update players called');

    for (i=0;i<availableGames.length;i++) {
      var game = availableGames[i];
      if (game.name == gameToUpdate.name) {
        game = gameToUpdate;
      }

    }

  };

  var free = function (name) {
    if (usedGameNames.indexOf(name) !== -1) {
      usedGameNames.splice(names.indexOf(name), 1);
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    assignGameName: assignGameName,
    updateGame: updateGame,
    removeGame: removeGame
  };
}());


module.exports = function (socket) {

	var userName = userNames.getGuestName();

//assign new socket a name and send them a list of current users
	socket.emit('init', {
    name: userName,
    users: userNames.get(),
    games: allGames.get()
  });

  setInterval(function () {
    socket.emit('send:time', {
      time: (new Date()).toString()
    });
  }, 1000);

  //rebroadcast users on new connection
  socket.broadcast.emit('send:users', {
    users: userNames.get()
  });




  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    //remove a name
    userNames.free(userName);
      //resend users to others
    socket.broadcast.emit('send:users', {
      users: userNames.get()
    });

    socket.emit('send:users', {
      users: userNames.get()
    });
  });


  socket.on('newGame', function (data) {
    var newGame = allGames.assignGameName(data);



//send the game initiator all game data AND joinedGame
    socket.emit('send:games', {
    games: allGames.get(),
    joinedGame: newGame
     });

//send all other users the list of games
    socket.broadcast.emit('send:games', {
    games: allGames.get()
     });


  });

  socket.on('joinGame', function (data) {
    var gameToJoin = data.gameObj;
    var availableGames = allGames.get();

    for (i=0;i<availableGames.length;i++) {
      var game = availableGames[i];

      //check for room in game and add player
      if (game.name == gameToJoin.name && game.type > game.players.length) {
        game.players.push(data.playerName);

        allGames.updateGame(game);

        socket.emit('send:games', {
        games: allGames.get(),
        joinedGame: game
       });

      //send all other users the list of games
    socket.broadcast.emit('send:games', {
    games: allGames.get()
     });


      } //end first if

      //check if game is now full
      if (game.type == game.players.length) {
        console.log(game);
        console.log('game full!');

        allGames.removeGame(game.name);

        //send all other users the list of games
    socket.broadcast.emit('send:games', {
    games: allGames.get()
     });

    //initialize the full game
    socket.broadcast.emit('game:start', {
    gameToStart: game
     });

        //initialize the full game
    socket.emit('game:start', {
    gameToStart: game
     });

      } //end if

    };



  });

};