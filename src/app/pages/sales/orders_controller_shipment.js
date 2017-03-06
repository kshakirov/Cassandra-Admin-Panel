function create_shipment_controller($scope, $http, $stateParams, $rootScope) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;


    function _init_edit(order_id, id) {
        $scope.stage = true
        console.log(id);
        $http.get('/admin/shipment/' + id + '/order/' + order_id).then(function (promise) {
            console.log(promise.data);
            $scope.shipment = promise.data;
            $scope.shipment.statuses = [{name: 'pending'}, {name: 'paid'}]
        })
    }


    function _init_list() {
        $http.get('/admin/shipment/').then(function (promise) {
            console.log(promise.data);
            $scope.shipments = promise.data;
            $rootScope.shipment = promise.data;
            $scope.shipmentsReady = true;
        })
    }

    $scope.init = function () {
        if ($rootScope  && $rootScope.shipments  && $rootScope.shipments.length > 0) {
            $scope.shipments = $rootScope.shipments;
            $scope.shipmentsReady = true;
        } else {
            _init_list();
        }
    }

    $scope.switchToEdit = function (order_id, id) {
        return _init_edit(order_id, id)
    }
    $scope.switchToList = function (id) {
        $scope.stage=false;
    }
}