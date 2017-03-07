
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
    function routeConfig($stateProvider, baSidebarServiceProvider) {
        $stateProvider
            .state('reports', {
                url: '/reports',
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
                url: '/carts/:id',
               //templateUrl: 'app/pages/customers/customer_container.html',
                title: 'Shopping Cart',
                sidebarMeta: {
                    order: 500,
                },
            })
            .state('reports.products', {
                //controller: 'CustomerController',
                url: '/products/:id',
               //templateUrl: 'app/pages/customers/customer_container.html',
                title: 'Products',
                sidebarMeta: {
                    order: 600,
                },
            })
        //     .state('report.carts.carts', {
        //         title: 'Product in Carts',
        //         //controller: 'CustomerNew',
        //         url: '/group/',
        //         templateUrl: 'app/pages/customers/group.html',
        //         sidebarMeta: {
        //             order: 600,
        //         }
        //
        //     })
        //     .state('report.carts.abandoned', {
        //         title: 'Abandoned Carts',
        //         //  controller: 'CustomerOrderController',
        //         url: '/online/',
        //         templateUrl: 'app/pages/customers/online.html',
        //         sidebarMeta: {
        //             order: 700,
        //         }
        //
        //     })
        // baSidebarServiceProvider.addStaticItem({
        //     state: 'reports',
        //     url: '/report',
        //     title: 'Reports',
        //     icon: 'ion-ios-more',
        //     subMenu: [{
        //         title: 'Orders',
        //         disabled: true
        //     }, {
        //         title: "Shopping Cart",
        //         subMenu: [{
        //             state: 'reports.cart.carts',
        //             url: '/group/',
        //             templateUrl: 'app/pages/customers/group.html',
        //             title: 'Product in Carts',
        //             disabled: false
        //         },
        //             {
        //                 title: 'Abandoned Carts',
        //                 url: '/online/',
        //                 templateUrl: 'app/pages/customers/online.html',
        //                 disabled: false
        //             }
        //         ]
        //     }]
        // });
    };

    // reports.controller("CustomerController", function ($scope, $http, $window, $stateParams) {
    //     _create_customers_controller($scope, $http, $window, $stateParams)
    // })


})();
/**
 * Created by kshakirov on 11/18/16.
 */


