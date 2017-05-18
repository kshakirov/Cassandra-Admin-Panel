'use strict';

var app = angular.module('BlurAdmin', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',
    'angular-progress-button-styles',

    'BlurAdmin.theme',
    'BlurAdmin.pages'
]);

app.factory('sessionInjector', function ($cookies) {
    var sessionInjector = {
        request: function (config) {

            config.headers['Authorization'] = "Bearer " + $cookies.getObject('token');

            return config;
        }
    };
    return sessionInjector;
});
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);

app.controller("SignInController", function ($scope, $http, $window) {
    function _get_user_proile() {
        return $http.post("/admin/profile", {}).then(function (promise) {
            return promise.data;
        })
    }

    $scope.init = function () {
        _get_user_proile().then(function (promise) {
            console.log()
        }, function (error) {
            console.log(error)
            if (error.status == 401) {
                $window.location.href = '/auth.html';
            }
        })
    }
})