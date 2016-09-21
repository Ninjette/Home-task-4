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
					// var pageLink = "http://www.omdbapi.com/?s="+ 'batman' +"&page="+(i+1);
					$scope.pages.push({num: i+1});
				};

				// $scope.pages = 
			}	
		}, input);
	};
	//pagination
	// $scope.pages = [
	// {
	// 	num: 1
	// },
	// {
	// 	num: 2
	// }
	// ]
	// Desired
	$scope.elemMask = 'elem_';
	$scope.desired = [
		// {
		// 	Title: 'title_1'
		// },
		// {
		// 	Title: 'title_2'
		// }
	];
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

		//idea 
		// if ! one from $scope.desired imdbID === movie.imdbID{
		//	all underneth
		//}
	}


	// idea for(var i = 0; localstorage.length; i++)
	// retrive[i]

	/*
	app.controller('ReviewController',function(){
		this.review = {};
		this.addReview = function(product){
			product.reviews.push(this.review);
			this.review = {};
		}
	})
	*/


	var testObject = { 'one': 1, 'two': 2, 'three': 3 };

	// Put the object into storage
	localStorage.setItem('testObject', JSON.stringify(testObject));

	// Retrieve the object from storage
	var retrievedObject = localStorage.getItem('testObject');

	console.log('retrievedObject: ', JSON.parse(retrievedObject));
});
