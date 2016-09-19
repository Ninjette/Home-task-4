var app = angular.module("moviesApp",[]);

app.service('dataService', function($http){

	//this referse to current service
	this.getJSON = function(callback, arg){
		$http.get("http://www.omdbapi.com/?s="+ arg)
			.then(callback)
	};
});


app.controller('mainController', function($scope, dataService){
	$scope.show = false;
	$scope.media = null;
	$scope.desired = {};
	$scope.searchFunc = function(input){
		dataService.getJSON(function(response, input){
			$scope.movies = response.data.Search;
		}, input);
	};
	$scope.addToDesired = function(movie, title){
		localStorage.setItem(title, null);
		$scope.desired.push(movie);
	}
});
