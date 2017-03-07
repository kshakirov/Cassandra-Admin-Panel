function _create_customers_controller($scope, $http,
                                      $window, $stateParams) {
    $scope.test = "Test"
    $scope.smartTablePageSize = 10;
    $scope.ordersReady = false;

    $scope.stage = false;

    function _init_edit(id) {
        $scope.stage = true;
        $scope.customer_id = id;
        $http.get('/admin/customer/' + id).then(function (promise) {
            console.log(promise.data);
            $scope.customer = promise.data;

        })
    }

    function _init_list() {
        return $http.get("/admin/customer/").then(function (promise) {
            $scope.customers = promise.data;
            $scope.customersReady = true;
        }, function (error) {
            console.log(error);
            $window.location.href = '/auth.html';
        })
    }


    $scope.init = function () {
        if ($stateParams.id) {
            this.customer_id = $stateParams.id;
            _init_edit($stateParams.id);
            $scope.stage = true

        } else {
            $scope.stage = false;
            _init_list();
        }
    }


    $scope.loadOrders = function () {

    }


    $scope.switchToEdit = function (id) {
        return _init_edit(id)
    }
    $scope.switchToList = function (id) {
        $scope.stage = false;
    }

}