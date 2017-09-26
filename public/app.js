const app = angular.module('voveo-services', []);


app.controller('Controller', ['$http', function($http){
  const controller = this;
  this.message = 'poop';

}]);
