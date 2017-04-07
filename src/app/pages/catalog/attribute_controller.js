function _create_attribute_controller($scope, $http, $stateParams, $window) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;

    function not_authorized (error, w) {
        if (error.status == 401) {
            w.location.href = '/auth.html';
        }
    }

    
    function _init_edit(id) {
        $http.get('/admin/attribute/' + id).then(function (promise) {
            $scope.attribute = promise.data;
        })
    }

    function _init_list() {
        $http.get("/admin/attribute/").then(function (promise) {
            $scope.attributes = promise.data;
            $scope.attributesReady = true;
        },function (error) {
                not_authorized(error, $window);
        }
        )
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