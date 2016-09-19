var app = angular.module("moviesApp",[]);

app.service('dataService', function($http){

	//this referse to current service
	this.getJSON = function(callback, arg){
		$http.get("http://www.omdbapi.com/?s="+ arg)
			.then(callback)
	};
});


app.controller('mainController', function($scope, dataService){
	$scope.src = "http://ia.media-imdb.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg";
	$scope.show = false;
	$scope.apiKey = '402c455d';
	$scope.imdbID = 'tt2294629';
	$scope.mediaLink = 'http://img.omdbapi.com/?i='+ $scope.imdbID +'&apikey='+ $scope.apiKey;
	console.log($scope.mediaLink);
	$scope.media = null;
	$scope.desired = {};
	$scope.searchFunc = function(input){
		dataService.getJSON(function(response, input){
			$scope.movies = response.data.Search;
			console.log(response.data);
		}, input);
	};
	$scope.addToDesired = function(movie, title){
		console.log('desired', title);
		localStorage.setItem(title, null);

		$scope.desired.push(movie);

	}
});
