//initialize app
var app = angular.module('CapstoneApp', ["firebase", 'angular.filter', 'ngRoute']);


//Setting Up routes
app.config(['$routeProvider', function($routeProvider){

	//route for main song view
	$routeProvider
		.when('/', {
			templateUrl: './static/partials/welcome.html',
			controller: 'OptionsCtrl as optionsCtrl'
		})
		.when('/play', {
			templateUrl: './static/partials/gameBoard.html',
			controller: 'GameCtrl as gameCtrl'
		});

	// 	.when('/songs/list', {
	// 		templateUrl: 'partials/songList.html',
	// 		controller: 'ShowSongsCtrl as showSongsCtrl'
	// 	})
	// 	//route for add song form
	// 	.when('/songs/new', {
	// 		templateUrl: 'partials/songForm.html',
	// 		controller: 'AddSongCtrl as addSongCtrl'
	// })
 //    .when('/songs/:songKey', {
 //      templateUrl: 'partials/singleSong.html',
 //      controller: 'SingleSongCtrl as singleSongCtrl'
 //    })
    // .otherwise({ redirectTo: 'logIn' });

}]);
