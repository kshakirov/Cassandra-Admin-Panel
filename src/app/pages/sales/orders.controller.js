function create_controller($scope, $http, $stateParams, $rootScope, $window, usSpinnerService) {
    $scope.test = "Test"
    $scope.smartTablePageSize = 10;
    $scope.stage = false;
    $scope.payment_methods = ['Credit Card', 'Paypal', 'Cache'];
    var currencies = {
        'USD' :  '$',
        'EUR' : '€',
        'GBP' : '£'
    }


    function not_authorized (error) {
        if (error.status == 401) {
            $window.location.href = '/auth.html';
        }
    }
  
    $scope.render_currency = function (currency_code) {
        return currencies[currency_code];
    }

    function _init_edit(id) {
        $scope.stage = true
        $scope.order_id = id;
        return $http.get('/admin/customer/order/' + id).then(function (promise) {
            $scope.order = promise.data;
            $scope.order.statuses = ['pending', 'paid', 'complete'];
            
        })
    }

    function _init_list_by_customer(customer) {
        return $http.get('/admin/customer/' + customer + '/order/').then(function (promise) {
            $scope.orders = promise.data;
            $rootScope.orders = promise.data;
            $scope.ordersReady = true;
        });
    }

    function _init_list() {
        return $http.get('/admin/order/').then(function (promise) {
            $scope.orders = promise.data;
            $rootScope.orders = promise.data;
            $scope.ordersReady = true;
        })
    }

    $scope.init = function () {
        if ($stateParams.id) {
            if($stateParams.id=='all' && $stateParams.customer){
                usSpinnerService.spin('spinner-1');
                _init_list_by_customer($stateParams.customer).then(function () {

                }, function (error) {
                    not_authorized(error)
                })
                $scope.stage = false
            }else {
                _init_edit($stateParams.id).then(function () {

                }, function (error) {
                    not_authorized(error)
                })
                $scope.stage = true
            }

        } else {
            $scope.stage=false;

            _init_list().then(function () {
                usSpinnerService.stop('spinner-1');
            }, function (error) {
                not_authorized(error);
            });
        }
    }


}

