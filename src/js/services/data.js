export {serviceFunc};
function serviceFunc($http){

	this.getJSON = (callback, arg) =>{
		$http.get("http://www.omdbapi.com/?s="+ arg)
			.then(callback)
	};

	this.getPageJSON = (callback, arg, page) =>{
		$http.get("http://www.omdbapi.com/?s="+ arg + "&page="+ page)
			.then(callback)
	};
}