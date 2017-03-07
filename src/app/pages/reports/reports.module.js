
(function () {
    'use strict';

    var reports = angular.module('BlurAdmin.pages.reports', ['ngCookies']);

    reports.factory('sessionInjector', function ($cookies) {
        var sessionInjector = {
            request: function (config) {

                config.headers['Authorization'] = "Bearer " + $cookies.getObject('token');

                return config;
            }
        };
        return sessionInjector;
    });

    reports.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('sessionInjector');
    }]);


    reports.config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reports', {
                url: '/customer',
                template: '<ui-view></ui-view>',
                abstract: true,
                //controller: 'CustomerController',
                title: 'Reports',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 400
                }
            })
            .state('reports.carts', {
                //controller: 'CustomerController',
                url: '/:id',
                template: '<ui-view></ui-view>',
                //templateUrl: 'app/pages/customers/customer_container.html',
                title: 'Shopping Cart',
                sidebarMeta: {
                    order: 500,
                },
            })
            .state('report.carts.carts', {
                title: 'Product in Carts',
                //controller: 'CustomerNew',
                url: '/group/',
                templateUrl: 'app/pages/customers/group.html',
                sidebarMeta: {
                    order: 600,
                }

            })
            .state('report.carts.abandoned', {
                title: 'Abandoned Carts',
                //  controller: 'CustomerOrderController',
                url: '/online/',
                templateUrl: 'app/pages/customers/online.html',
                sidebarMeta: {
                    order: 700,
                }

            })
    };

    // reports.controller("CustomerController", function ($scope, $http, $window, $stateParams) {
    //     _create_customers_controller($scope, $http, $window, $stateParams)
    // })


})();
/**
 * Created by kshakirov on 11/18/16.
 */


