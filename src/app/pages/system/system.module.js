
(function () {
    'use strict';

    var system = angular.module('BlurAdmin.pages.system', ['ngCookies']);

    system.factory('sessionInjector', function ($cookies) {
        var sessionInjector = {
            request: function (config) {

                config.headers['Authorization'] = "Bearer " + $cookies.getObject('token');

                return config;
            }
        };
        return sessionInjector;
    });
    system.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('sessionInjector');
    }]);


    system.config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('system', {
                url: '/system',
                template: '<ui-view></ui-view>',
                abstract: true,
                //controller: 'CustomerController',
                title: 'System',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 300
                }
            })
            .state('system.currency', {
                controller: 'CurrencyController',
                url: '/currency',
                templateUrl: 'app/pages/system/currency_container.html',
                title: 'Manage Currencies',
                sidebarMeta: {
                    order: 100,
                },
            })
           
    };

    system.controller("CurrencyController", function ($scope, $http, $window, $stateParams) {
        create_currency_controller($scope, $http, $window, $stateParams)
    })


})();
/**
 * Created by kshakirov on 11/18/16.
 */


