//factory for working with user's songs
app.factory("cardSrvs", ['$http', function($http) {


var newDeck = [];

generateDeck = function(){

$http({
  method: 'GET',
  url: 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4'
}).then(function successCallback(response) {
    // console.log(response.data);
    $http({
  method: 'GET',
  url: 'http://deckofcardsapi.com/api/deck/' +response.data.deck_id +'/draw/?count=208'
}).then(function successCallback(response) {
    // console.log(response.data.cards);
    newDeck = response.data.cards;


  }, function errorCallback(response) {
    console.log(response);
   });

  }, function errorCallback(response) {
    console.log(response);
   });

} //end getNewDeck

generateDeck();


  return {

    getNewDeck: function(){
      return newDeck;
    },

    prepareNewDeck: function(){
      generateDeck();
    }



  }; //end return

}]);
