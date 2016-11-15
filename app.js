var app = angular.module('ELearningApp', ['ngDraggable','ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
	         url: '/',
	         templateUrl:'views/home.html',
	         controller: 'dragDropCtrl'
	       })
		   .state('home.dragDrop', {
	          url: '/dragDrop',
	         templateUrl:'views/dragDrop.html',
	         controller: 'dragDropCtrl'
	       })
         .state('home.matchPair', {
  	          url: '/matchPair',
  	         templateUrl:'views/matchPair.html',
  	         controller: 'matchPairCtrl'
  	       })
});
