
(function () {
    'use strict';

    var reports = angular.module('BlurAdmin.pages.reports', ['ngCookies','elasticsearch']);

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
            .state('reports.visitors', {
                controller: 'VisitorController',
                url: '/carts/:id',
               templateUrl: 'app/pages/reports/visitors/visitors.html',
                title: 'Visitors Stats',
                sidebarMeta: {
                    order: 500,
                },
            })
            .state('reports.products', {
                controller: 'ProductRankController',
                url: '/products/:id',
               templateUrl: 'app/pages/reports/ranked_products/ranked_products.html',
                title: 'Ranked Products',
                sidebarMeta: {
                    order: 600,
                },
            })

    };

    reports.service('ElasticSearchService', function (esFactory) {
        return esFactory({
            host: 'https://admin.localhost'
        });
    });

    reports.controller("ProductRankController", function ($scope, $http, $window, $stateParams, ElasticSearchService) {
        _create_rank_products_controller($scope, $http, $window, $stateParams, ElasticSearchService)
    })

    reports.controller("VisitorController", function ($scope, $http, $window, $stateParams, ElasticSearchService) {
        _create_visitors_controller($scope, $http, $window, $stateParams, ElasticSearchService)
    })


})();
/**
 * Created by kshakirov on 11/18/16.
 */


