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
            console.log("Success");
            $scope.codeStatus = response.data;
            console.log($scope.codeStatus);
            $location.path('/#/success');
        }).

        error(function(response){
            console.log("Error");
            $scope.codeStatus = response || "Request Failed";
            console.log($scope.codeStatus);
        });
        return false;
    };
}
