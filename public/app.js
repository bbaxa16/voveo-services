const app = angular.module('voveo-services', []);


app.controller('Controller', ['$http', function($http){
  const controller = this;
  this.message = 'poop';
  this.url = 'http://localhost:3000/';
  this.login = function(userPass){
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: userPass.username, password: userPass.password }},
    }).then(function(response){
      if(response.data.message === 'Unauthorized'){
        console.log(response);
        this.error = 'username or password was incorrect'
        this.unauthorized = true;
      }
      else {
        this.user = response.data.user;
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('logged', JSON.stringify(true));
        console.log('successful login');
        this.checkLogin();
      }
    }.bind(this));
  }
  this.checkLogin = function() {
    if (localStorage.logged === "true"){
      controller.logged = true;
      console.log('we logged in foo');
    } else {
      controller.logged = false;
      console.log('we not');
    }
  }
  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  }
  this.checkLogin();
}]);
