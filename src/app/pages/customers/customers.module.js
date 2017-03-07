
(function () {
    'use strict';

    var customers = angular.module('BlurAdmin.pages.customers', ['ngCookies']);

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
            .state('customers.new', {
                title: 'Customer Groups',
                //controller: 'CustomerNew',
                url: '/new/',
                templateUrl: 'app/pages/customers/new.html',
                sidebarMeta: {
                    order: 300,
                }

            })
            .state('customers.order', {
                title: 'Online Customers',
                //  controller: 'CustomerOrderController',
                url: '/order/:id',
                templateUrl: 'app/pages/customers/order.html',
                sidebarMeta: {
                    order: 400,
                }

            })
    };

    customers.controller("CustomerController", function ($scope, $http, $window, $stateParams) {
        _create_customers_controller($scope, $http, $window, $stateParams)
    })

    // customers.controller("CustomerIdController", function ($scope,
    //                                                        $http, $stateParams, $location) {
    //     $scope.test = "Test";
    //     $scope.smartTablePageSize = 10;
    //
    //     $scope.init = function () {
    //         var id = $stateParams.id;
    //         if(id) {
    //             console.log(id);
    //             $http.get('/admin/customer/' + id).then(function (promise) {
    //                 console.log(promise.data);
    //                 $scope.customer = promise.data;
    //             });
    //
    //             $http.get('/admin/customer/' + id + '/order/').then(function (promise) {
    //                 console.log(promise.data);
    //                 $scope.orders = promise.data;
    //                 $scope.ordersReady = true;
    //             });
    //         }else{
    //             $location.path('/customers/list');
    //         }
    //     }
    //
    //
    // })

    // customers.controller("CustomerNew", function ($scope, $http) {
    //
    //
    //     $scope.init= function () {
    //         $scope.customer = {};
    //         $scope.flag = {create: true};
    //     };
    //
    //     $scope.createCustomer = function (customer) {
    //         console.log(customer);
    //         $http.post('/admin/customer/', customer).then(function (promise) {
    //             console.log(promise);
    //         })
    //     }
    // })

    // customers.controller("CustomerOrderController", function ($scope, $http,
    //                                                           $stateParams, $location) {
    //     $scope.test = "Test"
    //     $scope.smartTablePageSize = 10;
    //
    //     $scope.init = function () {
    //         var id = $stateParams.id;
    //         if(id) {
    //             console.log(id);
    //             $http.get('/admin/customer/order/' + id).then(function (promise) {
    //                 console.log(promise.data);
    //                 $scope.order = promise.data;
    //                 $scope.order.statuses =  [{name: 'pending'}, {name: 'paid'}]
    //             })
    //         }else{
    //             $location.path('/customers/list');
    //         }
    //     }
    //
    //
    // })

})();
/**
 * Created by kshakirov on 11/18/16.
 */


