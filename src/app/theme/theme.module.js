/**
 * @author v.lugovsky
 * created on 15.12.2015
 */
(function () {
    'use strict';

    var themeModule = angular.module('BlurAdmin.theme', [
        'toastr',
        'chart.js',
        'angular-chartist',
        'angular.morris-chart',
        'textAngular',
        'BlurAdmin.theme.components'
    ]);
    themeModule.controller("PageTopController", function ($scope, $cookies, $window, $http) {
        function _get_user_proile() {
            return $http.post("/admin/profile", {}).then(function (promise) {
                return promise.data;
            })
        }

        $scope.init = function () {
            _get_user_proile().then(function (promise) {
                console.log(promise)
                $scope.image_id = promise.image_id;
                $scope.name = promise.name;
            }, function (error) {
                console.log(error) 
            })
        };

        $scope.logout = function () {
            $cookies.remove('token')
            $window.location.href = '/auth.html';
        }
    })

})();
