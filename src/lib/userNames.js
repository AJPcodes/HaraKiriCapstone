"use strict";
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
    newGuestName = 'Guest_' + nextUserId;
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

module.exports = {
  claim: claim,
  free: free,
  get: get,
  getGuestName: getGuestName
};