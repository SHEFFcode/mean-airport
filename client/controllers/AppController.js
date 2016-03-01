var myApp = angular.module('myApp', []);

myApp.controller('AppController', ['$scope', '$http', function($scope, $http){
	console.log('App Controller Initialized');

	$scope.getAirports = function() {
		$http.get('/api/airports').success(function(response) {
			$scope.airports = response;
		});
	}

	$scope.findAirports = function() {
		$http.get('/api/airports/state/' + $scope.stateCode).success(function(response) {
			$scope.airports = response;
		});
	}
}]);