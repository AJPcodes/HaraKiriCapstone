//factory for working with user's songs
app.factory("configSrvs", [function() {


this.players = [];
this.deckStyle = '';
this.onlineGameDetails = {};


  return {

    newGame: function(){
      return {
        players: this.players,
        deckStyle: this.deckStyle,
      };
    },

    setUpGame: function(gameDetails){
      this.players = gameDetails.players;
      this.deckStyle = gameDetails.deckStyle;
    },

     newOnlineGame: function(){
      return this.onlineGameDetails;
    },

    setUpOnlineGame: function(game, userName){
      this.onlineGameDetails = game;
      this.onlineGameDetails.userName = userName;
    },


  }; //end return

}]);
