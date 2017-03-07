(function () {
    'use strict';

    var catalog = angular.module('BlurAdmin.pages.catalog', ['ngCookies']);




    catalog.config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('catalog', {
                url: '/catalog',
                template : '<ui-view></ui-view>',
                abstract: true,
                controller: 'CatalogController',
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
                title: 'Manage Product',
                sidebarMeta: {
                    order: 1,
                },
            }).state('catalog.featured_product', {
                url: '/featured_product/:id',
                templateUrl: 'app/pages/catalog/featured_product/featured_product_container.html',
                title: 'Featured Product',
                sidebarMeta: {
                    order: 2,
                },
            }).state('catalog.attribute', {
            url: '/attribute',
            templateUrl: 'app/pages/catalog/attribute/attribute.html',
            title: 'Attributes',
            sidebarMeta: {
                order: 3,
            },
        }).state('catalog.attribute_set', {
            url: '/attribute_set',
            templateUrl: 'app/pages/catalog/attribute_set/attribute_set.html',
            title: 'Attribute Sets',
            sidebarMeta: {
                order: 100,
            },
        });
        $urlRouterProvider.when('/catalog','/catalog/attribute');
    };

    catalog.controller('CatalogController', function ($scope, $http, $window) {

        $scope.attributeTablePageSize = 10;
        $scope.attributeSetTablePageSize = 10;

        $scope.initAttributes = function () {
            console.log("INIT");
            $http.get("/admin/attribute/").then(function (promise) {
                $scope.attributes = promise.data;
                $scope.attributesReady = true;
            }, function (error) {
                console.log(error);
                //$window.location.href = '/auth.html';
            })

        };

        $scope.editSet = function (code) {
            $http.get("/admin/attribute_set/" + code).then(function (promise) {
                $scope.attribute_set = promise.data[0];
                $scope.editAttributeSet = true;
            }, function (error) {
                console.log(error);
                //$window.location.href = '/auth.html';
            })
        }

        $scope.saveSet = function (set) {
            console.log(set)
            $http.post("/admin/attribute_set/", set).then(function (promise) {
                console.log(promise)
                $scope.editAttributeSet = true;
            }, function (error) {
                console.log(error);
                //$window.location.href = '/auth.html';
            })
        }

        $scope.initAttributeSets = function () {
            console.log("INIT as");
            $http.get("/admin/attribute_set/").then(function (promise) {
                $scope.attributeSets = promise.data;
                $scope.attributeSetsReady = true;
                $scope.editAttributeSet = false;
            }, function (error) {
                console.log(error);
                //$window.location.href = '/auth.html';
            })

        }
    })



})();/**
 * Created by kshakirov on 11/18/16.
 */


