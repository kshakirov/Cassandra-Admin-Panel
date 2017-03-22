(function () {
    'use strict';

    var catalog = angular.module('BlurAdmin.pages.catalog', ['ngCookies']);

    catalog.factory('sessionInjector', function ($cookies) {
        var sessionInjector = {
            request: function (config) {

                config.headers['Authorization'] = "Bearer " + $cookies.getObject('token');

                return config;
            }
        };
        return sessionInjector;
    });
    catalog.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('sessionInjector');
    }]);



    catalog.config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('catalog', {
                url: '/catalog',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: 'Catalog',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 100,
                },
            }).state('catalog.category', {
                url: '/category/:id',
                templateUrl: 'app/pages/catalog/category/category_container.html',
                title: 'Manage Categories',
                sidebarMeta: {
                    order: 0,
                },
            })      
            .state('catalog.product', {
                url: '/product/:id',
                templateUrl: 'app/pages/catalog/product/product_container.html',
                controller: 'ProductController',
                title: 'Manage Product',
                sidebarMeta: {
                    order: 1,
                },
            }).state('catalog.featured_product', {
                url: '/featured_product/:id',
                controller: 'FeaturedProductController',
                templateUrl: 'app/pages/catalog/featured_product/featured_product_container.html',
                title: 'Featured Product',
                sidebarMeta: {
                    order: 2,
                }
            }).state('catalog.new_product', {
            url: '/new_product/:id',
            controller: 'NewProductController',
            templateUrl: 'app/pages/catalog/new_product/new_product_container.html',
            title: 'New Product',
            sidebarMeta: {
                order: 3,
            }
        }).state('catalog.attribute', {
            url: '/attribute/:id',
            controller: 'AttributeController',
            templateUrl: 'app/pages/catalog/attribute/attribute_container.html',
            title: 'Attributes',
            sidebarMeta: {
                order: 3,
            },
        }).state('catalog.attribute_set', {
            url: '/attribute_set/:id',
            controller: 'AttributeSetController',
            templateUrl: 'app/pages/catalog/attribute_set/attribute_set_container.html',
            title: 'Attribute Sets',
            sidebarMeta: {
                order: 100,
            },
        });
        $urlRouterProvider.when('/catalog','/catalog/attribute');
    };
    catalog.controller("ProductController", function ($scope, $http, $stateParams) {
        _create_product_controller($scope, $http, $stateParams)
    })
    
    catalog.controller("AttributeController", function ($scope, $http, $stateParams, $window) {
        _create_attribute_controller($scope, $http, $stateParams,$window)
    })

    catalog.controller('AttributeSetController', function ($scope, $http, $window, $stateParams) {

       _create_attribte_set_controller($scope, $http, $window, $stateParams)
    })
    catalog.controller("FeaturedProductController", function ($scope, $http, $stateParams) {
        _create_featured_product_controller($scope, $http, $stateParams)
    })

    catalog.controller("NewProductController", function ($scope, $http, $stateParams) {
        _create_new_product_controller($scope, $http, $stateParams)
    })



})();/**
 * Created by kshakirov on 11/18/16.
 */


