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

        function _get_user_image(id) {
            return $http.get("/admin/profile/user/"+id +'/image', {}).then(function (promise) {
                return promise.data;
            })
        }


        $scope.init = function () {
            _get_user_proile().then(function (promise) {
                $scope.image_id = promise.image_id;
                $scope.name = promise.name;
                return promise.image_id;
            }, function (error) {
            }).then(function (id) {
                _get_user_image(id).then(function (image) {
                    $scope.image = 'data:image/jpeg;base64,' +  image;
                })
            })
        };

        $scope.logout = function () {
            $cookies.remove('token')
            $window.location.href = '/auth.html';
        }
    })

})();
