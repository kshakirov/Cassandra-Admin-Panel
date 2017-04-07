function create_shipment_controller($scope, $http, $stateParams, $rootScope, $window) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;

    function not_authorized (error) {
        if (error.status == 401) {
            $window.location.href = '/auth.html';
        }
    }

    function _init_edit(order_id, id) {
        $scope.stage = true
        console.log(id);
      return  $http.get('/admin/shipment/' + id + '/order/' + order_id).then(function (promise) {
            console.log(promise.data);
            $scope.shipment = promise.data;
            $scope.shipment.statuses = [{name: 'pending'}, {name: 'paid'}]
        })
    }


    function _init_list() {
        return $http.get('/admin/shipment/').then(function (promise) {
            $scope.shipments = promise.data;
            $rootScope.shipment = promise.data;
            $scope.shipmentsReady = true;
        })
    }

    function _init_list_by_order_id(order_id) {
        return $http.get('/admin/shipment/order/' + order_id).then(function (promise) {
            $scope.shipments = promise.data;
            $rootScope.shipment = promise.data;
            $scope.shipmentsReady = true;
        })
    }


    $scope.init = function () {
        if ($stateParams.id && $stateParams.order) {
            if ($stateParams.id == 'all') {
                $scope.stage = false;
                _init_list_by_order_id($stateParams.order).then(function () {

                }, function (error) {
                    not_authorized(error);
                })
            } else {
                _init_edit($stateParams.order, $stateParams.id)
                $scope.stage = true
            }

        } else {
            $scope.stage = false;
            _init_list().then(function () {

            }, function (error) {
                not_authorized(error)
            });
        }
    }


    $scope.switchToEdit = function () {

    }

    $scope.switchToList = function (id) {
    }
}