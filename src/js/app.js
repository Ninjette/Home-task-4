require('../sass/style.scss');
import {serviceFunc} from "./services/data.js";
import {controllerFunc} from "./controllers/mainController.js";

angular.module("moviesApp",[])
	.service('dataService', serviceFunc)
	.controller('mainController', controllerFunc);


//test field 
// var myArray = ['Backham','Arny','Crit'];
// console.log(myArray + ' myArray', myArray.sort()+' myArray sorted');