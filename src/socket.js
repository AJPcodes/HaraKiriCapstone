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
  var currentGames = [];

  var claim = function (gameName) {
    if (!gameName || availableGames.indexOf(gameName) !== -1 || currentGames.indexOf(gameName) !== -1 ) {
      return false;
    } else {
      availableGames.push(gameName);
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var assignGameName = function (numPlayers) {
    var newGameName,
      nextId = 1;

    do {
      newGameName = numPlayers + ' Player Game #' + nextId;
      nextId += 1;
    } while (!claim(newGameName));

    return newGameName;
  };

  // serialize claimed names as an array
  var get = function () {
    return availableGames;
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
    assignGameName: assignGameName
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

    // clean up when a user leaves, and broadcast it to other users
  socket.on('newGame', function (data) {
    var newGame = allGames.assignGameName(data.numPlayers);

    socket.emit('send:games', {
    games: allGames.get()
     });

    socket.broadcast.emit('send:games', {
    games: allGames.get()
     });


  });

};