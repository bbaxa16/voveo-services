const app = angular.module('voveo-services', []);


app.controller('Controller', ['$http', function($http){
  const controller = this;
  this.message = 'poop';
  this.url = 'http://voveo-api.herokuapp.com';
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
        console.log(response);
        this.user = response.data.user;
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('logged', JSON.stringify(true));
        console.log('successful login');
        localStorage.setItem('id', JSON.stringify(response.data.user.id))
        this.checkLogin();
        this.loginForm = false;
        this.unauthorized = false;
      }
    }.bind(this));
  }
  this.checkLogin = function() {
    if (localStorage.logged === "true"){
      controller.logged = true;
      controller.loginForm = false;
      controller.show(localStorage.id);
    } else {
      controller.logged = false;
      controller.loginForm = true;
    }
  }
  this.show = function(id){
      $http({
        url: this.url + '/users/' + id,
        method: 'GET'
      }).then(function(response){
        console.log(response);
        this.data = response.data.data
        this.username = response.data.username
      }.bind(this));
    }
  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  }
  this.checkLogin();
}]);
