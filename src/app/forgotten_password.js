var forgotten_app = angular.module('ForgottenPassApp', ['ngCookies']);
forgotten_app.controller("UserResetPass", function ($scope, $http,
                                                $window) {
    $scope.error = {
        flag: false,
        msg: ""
    }

    $scope.resetPassword = function (login) {
        console.log("dfdfd");
        var data = {
            login: login
        };
        return $http.post("/authorize/reset", data)
            .then(function (promise) {
                $window.location.href = '/';

            }, function (error) {
                $scope.error.flag = true;
                $scope.error.msg = error.data.message;

            })
    }
})
