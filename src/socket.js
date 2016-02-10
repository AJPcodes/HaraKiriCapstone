"use strict";
// Keep track of which names are used so that there are no duplicates
var userNames = require('./lib/userNames.js');

// Keep track of which games and avoid duplicates
var allGames = require('./lib/allGames.js');

module.exports = function (socket) {

	var userName = userNames.getGuestName();
  var userGame = null;

//assign new socket a name and send them a list of current users
	socket.emit('init', {
    name: userName,
    users: userNames.get(),
    games: allGames.get()
  });


  //rebroadcast users on new connection
  socket.broadcast.emit('send:users', {
    users: userNames.get()
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

    userGame = newGame;

  });

  socket.on('leaveGame', function (data) {
    var gameToLeave = data.gameObj;
    var availableGames = allGames.get();

    for (let i=0;i<availableGames.length;i++) {
      var game = availableGames[i];
        //check for room in game and add player
      if (game.name == gameToLeave.name) {

      game.players.splice(game.players.indexOf(userName), 1);
        userGame = null;
        allGames.updateGame(game);
      } //end if
        //check if game is now empty
      if (game.players.length === 0) {
        allGames.removeGame(game.name);
      } //end if
    };  //end for loop

    socket.emit('send:games', {
      games: allGames.get(),
      joinedGame: null
    });

    //send all other users the list of games
    socket.broadcast.emit('send:games', {
      games: allGames.get()
    });
  }); //end leave game

  socket.on('joinGame', function (data) {
    var gameToJoin = data.gameObj;
    var availableGames = allGames.get();

    for (let i=0;i<availableGames.length;i++) {
      var game = availableGames[i];

        //check for room in game and add player
      if (game.name == gameToJoin.name && game.type > game.players.length) {
        game.players.push(data.playerName);
        userGame = game;

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
    };  //end for loop
  }); //end join game

  //get and send updated game data when a player makes a move
  socket.on('send:gameData', function(data){
    socket.broadcast.emit('receive:gameData', data)
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    //remove a name
    userNames.free(userName);
    if (userGame) {
      allGames.free(userGame.name);
    }
      //resend users to others
    socket.broadcast.emit('send:users', {
      users: userNames.get()
    });

    if (userGame) {
      socket.broadcast.emit('user:disconnect', {
        gameName: userGame.name,
        userName: userName
      })
    }
  }); //end disconnect

  socket.on('disconnectReceived', function () {
    //make sure the userGame is null so disconnect won't trigger for new players resuing the game name
    userGame = null;
  }); //end disconnect

  socket.on('gameOver', function () {
    //free the game name for re-use
    if (userGame) {
      allGames.free(userGame.name);
    }

  }); //end gameOver

}; //end module exports