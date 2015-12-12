//factory for working with user's songs
app.factory("configSrvs", [function() {


this.players = [];
this.deckStyle = '';


  return {

    newGame: function(){
      return {
        players: this.players,
        deckStyle: this.deckstyle,
      };
    },

    setDeck: function(chosenDeck){
      this.deckStyle = chosenDeck;
    },

    setPlayers: function(chosenPlayers){
      this.players = chosenPlayers;
    }

  }; //end return

}]);
