
(function () {
    'use strict';

    var system = angular.module('BlurAdmin.pages.system', ['ngCookies', 'ui.ace']);

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
                }
            }).state('system.message', {
            controller: 'MessageController',
            url: '/message',
            templateUrl: 'app/pages/system/message_container.html',
            title: 'Manage Messages',
            sidebarMeta: {
                order: 200,
            }
        }).state('system.templates', {
            controller: 'TemplatesController',
            url: '/templates',
            templateUrl: 'app/pages/system/template_container.html',
            title: 'Edit Templates',
            sidebarMeta: {
                order: 200,
            }
        })
           
    };

    system.controller("CurrencyController", function ($scope, $http, $window, $stateParams) {
        create_currency_controller($scope, $http, $window, $stateParams)
    })
    system.controller("MessageController", function ($scope, $http, $window, $stateParams) {
        create_message_controller($scope, $http, $window, $stateParams)
    })
    system.controller("TemplatesController", function ($scope, $http, $window, $stateParams) {
        create_template_controller($scope, $http, $window, $stateParams)
    })


})();
/**
 * Created by kshakirov on 11/18/16.
 */


