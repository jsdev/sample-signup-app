'use strict';
var myApp = angular.module('gorilla-campaign', ['ngRoute']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'js/templates/main.html',
            controller: 'SignupFormCtrl'
        })
        .when('/success',{
            templateUrl: 'js/templates/success.html'
        })
        .when('/entryexists',{
            templateUrl: 'js/templates/entryexists.html'
        })
        .when('/error', {
            templateUrl: 'js/templates/notsaved.html'
        });

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
