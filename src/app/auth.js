var auth_app = angular.module('AuthApp', ['ngCookies']);
auth_app.controller("UserLogin", function ($scope, $http,
                                           $cookies,
                                           $window) {
    $scope.error = {
        flag: false,
        msg: ""
    }

    $scope.submitLogin = function () {
        var data = {
            login: $scope.email,
            password: $scope.password
        };
        return $http.post("/authorize/login", data)
            .then(function (promise) {
                $cookies.putObject('token', promise.data.token);
                $window.location.href = '/';

            }, function (error) {
                $scope.error.flag = true;
                $scope.error.msg = error.data.message;

            })
    }
})
