require('../sass/style.scss');
import {serviceFunc} from "./services/data.js";
import {controllerFunc} from "./controllers/mainController.js";

angular.module("moviesApp",[])
	.service('dataService', serviceFunc)
	.controller('mainController', controllerFunc);