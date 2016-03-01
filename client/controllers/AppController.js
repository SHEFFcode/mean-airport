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

	$scope.findAirportsByProx = function() {
		var location = {
			distance: $scope.location.distance
		}
		$http.get('/geocode/location?address=' + $scope.location.address).success(function(loc_response) {
			location.lat = loc_response.locations[0].latitude;
			location.lon = loc_response.locations[0].longitude;
			
			$http.post('/api/airports/prox', location).success(function(response) {
				$scope.airports = response;
			});
		});
	}
}]);