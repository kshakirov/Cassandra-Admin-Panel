var auth_app = angular.module('AuthApp', ['ngCookies']);
auth_app.controller("UserLogin", function ($scope, $http,
                                           $cookies,
                                           $window) {
    $scope.init = function () {
        console.log("Hi it is login")
    };
    
    $scope.submitLogin = function () {
        var data = {
            login: $scope.email,
            password: $scope.password
        };
        return $http.post("/authorize/login", data)
            .then(function (promise) {
                if (promise.data.result == 'success') {
                    console.log(promise);
                    $cookies.putObject('token', promise.data.token);
                    $window.location.href = '/';
                }else{
                    $scope.isNotAuthorized = true;
                    console.log("Not logged in")
                }

            }, function (error) {
                console.log('Error')
            })
    }
})
