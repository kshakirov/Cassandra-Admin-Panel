function _create_attribte_set_controller($scope, $http, $window, $stateParams) {
    $scope.attributeSetTablePageSize = 10;
    $scope.stage = false;


    function _init_list() {
        $http.get("/admin/attribute-sets/").then(function (promise) {
            $scope.attributeSets = promise.data;
            $scope.attributeSetsReady = true;
            $scope.editAttributeSet = false;
        }, function (error) {
            $window.location.href = '/auth.html';
        })
    }

    function _init_item(id) {
        $http.get("/admin/attribute-sets/" + id).then(function (promise) {
            $scope.attribute_set = promise.data;
            $scope.editAttributeSet = true;
            return promise.data.attributes;
        }, function (error) {
            $window.location.href = '/auth.html';
        }).then(function (attributes) {
            var data = attributes;
            $http.post('/admin/attribute-sets/'+ id + "/attributes/", data).then(function (promise) {
                console.log(promise.data);
                $scope.attributes = promise.data;
            })
        })
    }


    $scope.init = function () {
        if ($stateParams.id) {
            _init_item(($stateParams.id))
            $scope.stage = true
        } else {
            _init_list();
            $scope.stage = false
        }

    }
}
/**
 * Created by kshakirov on 3/8/17.
 */
