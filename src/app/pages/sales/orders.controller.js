function create_controller($scope, $http, $stateParams, $rootScope) {
    $scope.test = "Test"
    $scope.smartTablePageSize = 10;
    $scope.stage = false;

  
    

    function _init_edit(id) {
        $scope.stage = true
        $scope.order_id = id;
        $http.get('/admin/customer/order/' + id).then(function (promise) {
            $scope.order = promise.data;
            $scope.order.statuses = ['pending', 'paid', 'complete'];
            
        })
    }


    function _init_list() {
        $http.get('/admin/order/').then(function (promise) {
            console.log(promise.data);
            $scope.orders = promise.data;
            $rootScope.orders = promise.data;
            $scope.ordersReady = true;
        })
    }

    $scope.init = function () {
        if ($stateParams.id) {
           _init_edit($stateParams.id)
            $scope.stage=true

        } else {
            $scope.stage=false;
            _init_list();
        }
    }


}
