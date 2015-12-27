//factory for working with user's songs
app.factory("configSrvs", [function() {


this.players = [];
this.deckStyle = './static/img/cardBacks/blue.jpg';
this.onlineGameDetails = {};


  return {

    //function called to get player and deck styles for an offline game
      newGame: function(){
        console.log(this.deckStyle);
      return {
        players: this.players,
        deckStyle: this.deckStyle,
      };
    }.bind(this),

    //function called to set players and deck styles for an offline game
    setUpGame: function(gameDetails){
      this.players = gameDetails.players;
      this.deckStyle = gameDetails.deckStyle;
    }.bind(this),

     newOnlineGame: function(){
      return this.onlineGameDetails;
    }.bind(this),


    setUpOnlineGame: function(game, userName){
      this.onlineGameDetails = game;
      this.onlineGameDetails.userName = userName;
    }.bind(this),

    //allows user to change the deck-style - called by optionsCtrl
    setDeckStyle: function(chosenStyle){
      this.deckStyle = chosenStyle;
    }.bind(this)

  }; //end return

}]);
