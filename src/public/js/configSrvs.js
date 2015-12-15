//factory for working with user's songs
app.factory("configSrvs", [function() {


this.players = [];
this.deckStyle = '';


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
    }

  }; //end return

}]);
