function create_controller($scope, $http, $stateParams, $rootScope) {
    $scope.test = "Test"
    $scope.smartTablePageSize = 10;
    $scope.stage = false;


    function _init_edit(id) {
        $scope.stage = true
        console.log(id);
        $http.get('/admin/customer/order/' + id).then(function (promise) {
            console.log(promise.data);
            $scope.order = promise.data;
            $scope.order.statuses = [{name: 'pending'}, {name: 'paid'}]
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
        if ($rootScope  && $rootScope.orders  && $rootScope.orders.length > 0) {
            $scope.orders = $rootScope.orders;
            $scope.ordersReady = true;
        } else {
            _init_list();
        }
    }

    $scope.switchToEdit = function (id) {
        return _init_edit(id)
    }
    $scope.switchToList = function (id) {
        $scope.stage=false;
    }
}

