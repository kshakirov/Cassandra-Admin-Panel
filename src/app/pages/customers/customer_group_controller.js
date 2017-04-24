function _create_customer_group_controller($scope, $http,
                                      $window, $stateParams) {
    var url_prefix = '/admin/';
    function _init_list() {
        return $http.get(url_prefix + "customer_group/").then(function (promise) {
              return promise.data;
        }, function (error) {
            console.log(error);
            $window.location.href = '/auth.html';
        })
    }

    function _update(group) {
        return $http.put(url_prefix + "customer_group/", group).then(function (promise) {
            return promise.data;
        })
    }

    $scope.init = function () {
        _init_list().then(function (promise) {
            $scope.customerGroups = promise;
            $scope.customerGroupsReady = true;
        })
    }

    $scope.updateGroup = function (group) {
        _update(group)

    }
}