
(function () {

    'use strict';

    var sales = angular.module('BlurAdmin.pages.sales', ['ngCookies']);




    sales.config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('sales', {
                url: '/sales',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: 'Sales',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 300,
                },
            }).state('sales.orders', {
            url: '/orders/:id?customer=',
            templateUrl: 'app/pages/sales/orders/order_container.html',
            controller: 'OrdersController',
            title: 'Orders',
            sidebarMeta: {
                order: 0,
            },
        }).state('sales.invoices', {
            url: '/invoices',
            templateUrl: 'app/pages/sales/invoices/list.html',
            title: 'Invoices',
            sidebarMeta: {
                order: 101,
            },
        }).state('sales.shipments', {
                url: '/shipment/:id?order=:order_id',
                templateUrl: 'app/pages/sales/shipments/shipment_container.html',
                title: 'Shipments',
                controller: 'ShipmentsController',
                sidebarMeta: {
                    order: 103,
                },
            }).state('sales.transactions', {
            url: '/transactions',
            templateUrl: 'app/pages/sales/invoices/list.html',
            title: 'Transactions',
            sidebarMeta: {
                order: 103,
            },
        });
       // $urlRouterProvider.when('/catalog','/catalog/attribute');
    };

    sales.controller('OrdersController', function ($scope, $http, $stateParams,  $rootScope, $window){
        create_controller($scope, $http, $stateParams,  $rootScope, $window);
    }).controller('ShipmentsController', function ($scope, $http, $stateParams,  $rootScope, $window){
        create_shipment_controller($scope, $http, $stateParams,  $rootScope, $window);
    });
  })();/**
 * Created by kshakirov on 11/18/16.
 */


