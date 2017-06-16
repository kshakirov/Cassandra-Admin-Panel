
(function () {
    'use strict';

    var customers = angular.module('BlurAdmin.pages.customers', ['ngCookies', 'angularSpinner', 'countrySelect',
        'angular-directive-select-usstates']);

    customers.factory('sessionInjector', function ($cookies) {
        var sessionInjector = {
            request: function (config) {

                config.headers['Authorization'] = "Bearer " + $cookies.getObject('token');

                return config;
            }
        };
        return sessionInjector;
    });
    customers.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('sessionInjector');
    }]);


    customers.config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('customers', {
                url: '/customer',
                template: '<ui-view></ui-view>',
                abstract: true,
                //controller: 'CustomerController',
                title: 'Customers',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 300
                }
            })
            .state('customers.list', {
                controller: 'CustomerController',
                url: '/:id',
                templateUrl: 'app/pages/customers/customer_container.html',
                title: 'Manage Customers',
                sidebarMeta: {
                    order: 100,
                },
            })
            .state('customers.groups', {
                title: 'Customer Groups',
                controller: 'CustomerGroupController',
                url: '/group/',
                templateUrl: 'app/pages/customers/group.html',
                sidebarMeta: {
                    order: 300,
                }

            })
            .state('customers.online', {
                title: 'Online Customers',
                //  controller: 'CustomerOrderController',
                url: '/online/',
                templateUrl: 'app/pages/customers/online.html',
                sidebarMeta: {
                    order: 400,
                }

            })
    };

    customers.controller("CustomerController", function ($scope, $http, $window, $stateParams, $q, usSpinnerService) {
        _create_customers_controller($scope, $http, $window, $stateParams, $q, usSpinnerService)
    })

    customers.controller("CustomerGroupController", function ($scope, $http, $window, $stateParams) {
        _create_customer_group_controller($scope, $http, $window, $stateParams)
    })


})();
/**
 * Created by kshakirov on 11/18/16.
 */


