function _create_attribute_controller($scope, $http, $stateParams, $window) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;


    function _init_edit(id) {
        $http.get('/admin/attribute/' + id).then(function (promise) {
            $scope.attribute = promise.data;
        })
    }

    function _init_list() {
        $http.get("/admin/attribute/").then(function (promise) {
            $scope.attributes = promise.data;
            $scope.attributesReady = true;
        }, function (error) {
            $window.location.href = '/auth.html';
        })
    }

    $scope.init = function () {
        if ($stateParams.id) {
            _init_edit($stateParams.id)
            $scope.stage = true
        } else {
            $scope.stage = false;
            _init_list();
        }
    }
}