export {controllerFunc}

function controllerFunc($scope, dataService){
	$scope.show = false;
	$scope.desired = {};
	$scope.propertyName = "Year";
	let inputData;

	$scope.changePage = function(page){
		dataService.getPageJSON((response, inputData) =>{
			$scope.movies = response.data.Search;

		}, inputData, page);
	};

	$scope.searchFunc = function(input){
		$scope.pages = [];
		inputData = input;
		dataService.getJSON((response, input) =>{
			$scope.movies = response.data.Search;
			let results = response.data.totalResults;
			if(results.length > 1){
				let pagesAmount = results.substring(0, results.length - 1);

				for (let i = 0; i <= pagesAmount; i++) {
					$scope.pages.push({num: i+1});
				};
			}
		}, input);
	};

	// Desired
	$scope.elemMask = 'elem_';
	$scope.desired = [];
	$scope.showDesired = () =>{
		$scope.lsLength = localStorage.length;
		if ($scope.lsLength > 0) {
			for(let i = 0; i < $scope.lsLength; i++) {
				let key = localStorage.key(i);
				if(key.indexOf($scope.elemMask) == 0) {
					$scope.desired.push(JSON.parse(localStorage.getItem(key)));
					let lsKey = localStorage.getItem(key);
				}
			}
	
		};
	}
	$scope.showDesired();
	$scope.addToDesired = (movie) =>{

		$scope.hasSameId = false;

		for(let index in $scope.desired) { 
			if($scope.desired[index].imdbID == movie.imdbID){
				$scope.hasSameId = true;
			};

		};

		if (!$scope.hasSameId) {
			let objectLength = Object.keys($scope.desired).length;
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
}