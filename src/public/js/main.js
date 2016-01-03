//initialize app
var app = angular.module('CapstoneApp', ["firebase", 'angular.filter', 'ngRoute']);


//Setting Up routes
app.config(['$routeProvider', function($routeProvider){

	//route for main view
	$routeProvider
		.when('/', {
			templateUrl: './static/partials/welcome.html',
			controller: 'OptionsCtrl as optionsCtrl'
		})
			//route for offline play
		.when('/play', {
			templateUrl: './static/partials/gameBoard.html',
			controller: 'GameCtrl as gameCtrl'
		})
			//route for online play
		.when('/online', {
			templateUrl: './static/partials/onlineGameBoard.html',
			controller: 'OnlineGameCtrl as gameCtrl'
		});


}]);
