(function () {
    'use strict';

    var orders = angular.module('BlurAdmin.pages.orders', ['ngCookies']);

    orders.factory('sessionInjector',  function($cookies) {
        var sessionInjector = {
            request: function(config) {

                config.headers['Authorization'] = "Bearer " +  $cookies.getObject('token');

                return config;
            }
        };
        return sessionInjector;
    });
    orders.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('sessionInjector');
    }]);
    

    orders.config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('orders', {
                controller: 'OrderController',
                url: '/orders',
                templateUrl: 'app/pages/orders/orders.html',
                title: 'Customer',
                sidebarMeta: {
                    order: 800,
                },
            }).state('order', {
            title: 'Customer',
            controller: 'OrderIdController',
            url: '/orders/:id',
            templateUrl: 'app/pages/orders/order.html',

        });
    }

    orders.controller("OrderController", function ($scope, $http,  $filter, editableOptions, editableThemes) {
        $scope.test = "Test"
        $scope.smartTablePageSize = 10;
        $scope.smartTableData = [
            {
                id: 1,
                firstName: 'Mark',
                lastName: 'Otto',
                username: '@mdo',
                email: 'mdo@gmail.com',
                age: '28'
            },
            {
                id: 2,
                firstName: 'Jacob',
                lastName: 'Thornton',
                username: '@fat',
                email: 'fat@yandex.ru',
                age: '45'
            }

        ];
        $scope.init = function () {
            $http.get("/admin/customer/").then(function (promise) {
                $scope.customers = promise.data;
                $scope.customersReady = true;
            })
        }

    })
    orders.controller("OrderIdController", function ($scope, $http,  $stateParams) {
        $scope.test = "Test"
        $scope.smartTablePageSize = 10;

        $scope.init = function () {
            var id = $stateParams.id;
            console.log(id);
            $http.get('/admin/customer/' + id).then(function (promise) {
                console.log(promise.data);
                $scope.customer = promise.data;
            })
        }
            

    })
    
})();/**
 * Created by kshakirov on 11/18/16.
 */


