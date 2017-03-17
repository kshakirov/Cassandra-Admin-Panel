function create_controller($scope, $http, $stateParams, $rootScope) {
    $scope.test = "Test"
    $scope.smartTablePageSize = 10;
    $scope.stage = false;
    $scope.payment_methods = ['Credit Card', 'Paypal', 'Cache'];

  
    

    function _init_edit(id) {
        $scope.stage = true
        $scope.order_id = id;
        $http.get('/admin/customer/order/' + id).then(function (promise) {
            $scope.order = promise.data;
            $scope.order.statuses = ['pending', 'paid', 'complete'];
            
        })
    }

    function _init_list_by_customer(customer) {
        $http.get('/admin/customer/' + customer + '/order/').then(function (promise) {
            $scope.orders = promise.data;
            $rootScope.orders = promise.data;
            $scope.ordersReady = true;
        });
    }

    function _init_list() {
        $http.get('/admin/order/').then(function (promise) {
            $scope.orders = promise.data;
            $rootScope.orders = promise.data;
            $scope.ordersReady = true;
        })
    }

    $scope.init = function () {
        if ($stateParams.id) {
            if($stateParams.id=='all' && $stateParams.customer){
                _init_list_by_customer($stateParams.customer);
                $scope.stage = false
            }else {
                _init_edit($stateParams.id)
                $scope.stage = true
            }

        } else {
            $scope.stage=false;
            _init_list();
        }
    }


}

