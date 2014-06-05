'use strict';
var myApp = angular.module('gorilla-campaign', ['ngRoute']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'SignupFormCtrl'
        })
        .when('/success',{
            templateUrl: 'templates/success.html',
            controller: 'HomePageCtrl'
        })
        .when('/entryexists',{
            templateUrl: 'templates/entryexists.html',
            controller: 'HomePageCtrl'
        })
        .when('/error', {
            templateUrl: 'templates/notsaved.html'
        })
        .otherwise({ redirectTo: '/' });;

}]);

function SignupFormCtrl($scope, $location, $http, $templateCache){
    var method = 'POST';
    var insertUrl = 'http://localhost:8080/insertRecord';
    $scope.save = function(){
        var formData = {
            'firstName' :   this.firstName,
            'lastName'  :   this.lastName,
            'email'     :   this.email
        };

        var userData = 'userInfo='+JSON.stringify(formData);

        $http({
            method  :   method,
            url     :   insertUrl,
            data    :   userData,
            headers :   {'Content-Type':'application/x-www-form-urlencoded'},
            cache   :   $templateCache
        }).
        success(function(response){
            if(response.err != undefined){
                if(response.err.toString().indexOf('duplicate key') >= 0){
                    $location.path('/entryexists');
                }
                else{
                    $location.path('/error');
                }
            } else {
                 $location.path('/success');
            }
        }).
        error(function(response){
            $location.path('/error');
        });
        return false;
    };
}

myApp.controller('HomePageCtrl', function($scope, $location){
    $scope.goToHomePage = function(){
        console.log("inside function");
        $location.path('/');
    }
});
