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
		.when('/play2', {
			templateUrl: './static/partials/gameboard2.html',
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
