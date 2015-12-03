//initialize app
var app = angular.module('CapstoneApp', ["firebase", 'angular.filter', 'ngRoute']);


//Setting Up routes
app.config(['$routeProvider', function($routeProvider){

	//route for main song view
	$routeProvider
		.when('/', {
			templateUrl: './static/partials/welcome.jade',
			controller: 'OptionsCtrl as optionsCtrl'
		});
	// 	.when('/register', {
	// 		templateUrl: 'partials/register.html',
	// 		controller: 'AuthCtrl as authCtrl'
	// 	})
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
