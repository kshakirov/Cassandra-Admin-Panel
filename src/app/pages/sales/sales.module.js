
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
            url: '/orders',
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
        }).state('sales.transactions', {
            url: '/transactions',
            templateUrl: 'app/pages/sales/invoices/list.html',
            title: 'Transactions',
            sidebarMeta: {
                order: 102,
            },
        });
       // $urlRouterProvider.when('/catalog','/catalog/attribute');
    };

    sales.controller('OrdersController', function ($scope, $http, $stateParams,  $rootScope){
        create_controller($scope, $http, $stateParams,  $rootScope);
    });
  })();/**
 * Created by kshakirov on 11/18/16.
 */


