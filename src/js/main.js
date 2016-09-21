var app = angular.module("moviesApp",[]);

app.service('dataService', function($http){

	this.getJSON = function(callback, arg){
		$http.get("http://www.omdbapi.com/?s="+ arg)
			.then(callback)
	};

	this.getPageJSON = function(callback, arg, page){
		$http.get("http://www.omdbapi.com/?s="+ arg + "&page="+ page)
			.then(callback)
	};
});



app.controller('mainController', function($scope, dataService){
	$scope.show = false;
	$scope.apiKey = '402c455d';
	$scope.media = null;
	$scope.desired = {};
	$scope.pages = [];
	var inputData;

	$scope.changePage = function(page){
		dataService.getPageJSON(function(response, inputData){
			console.log(inputData, 'input');
			$scope.movies = response.data.Search;
			console.log(response.data);

		}, inputData, page);
	};

	$scope.searchFunc = function(input){
		inputData = input;
		dataService.getJSON(function(response, input){
			$scope.movies = response.data.Search;
			console.log(response.data);
			var results = response.data.totalResults;
			if(results.length > 1){
				var pagesAmount = results.substring(0, results.length - 1);

				for (var i = 0; i <= pagesAmount; i++) {
					$scope.pages.push({num: i+1});
				};
			}
		}, input);
	};

	// Desired
	$scope.elemMask = 'elem_';
	$scope.desired = [];
	$scope.showDesired = function(){
		$scope.lsLength = localStorage.length;
		if ($scope.lsLength > 0) {
			for(var i = 0; i < $scope.lsLength; i++){
				var key = localStorage.key(i);
				if(key.indexOf($scope.elemMask) == 0){
					$scope.desired.push(JSON.parse(localStorage.getItem(key)));
					var lsKey = localStorage.getItem(key);
				}
			}
	
		};
	}
	$scope.showDesired();
	$scope.addToDesired = function(movie){

		$scope.hasSameId = false;

		for(var index in $scope.desired) { 
			if($scope.desired[index].imdbID == movie.imdbID){
				$scope.hasSameId = true;
			};

		};

		if (!$scope.hasSameId) {
			var objectLength = Object.keys($scope.desired).length;
			if (objectLength > 0) {
				$scope.elemId = objectLength;
			} else {
				$scope.elemId = 0;
			};
			movie.attrID = $scope.elemMask + $scope.elemId;
			$scope.desired.push(movie);

			localStorage.setItem($scope.elemMask + $scope.elemId, JSON.stringify(movie));
		};
	}
});


//ideas space
	//var obj= document.createElement('select');
	//obj.style.width= "100px";
	// var element = document.querySelector('.pagination__item');
	// element.style.width= "100px";