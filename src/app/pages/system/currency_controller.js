function create_currency_controller($scope, $http, $window, $stateParams) {
    $scope.success = {flag: false};
    $scope.error = {
        flag: false
    }
    var prefix = '/admin/';

    function not_authorized (error) {
        if (error.status == 401) {
            $window.location.href = '/auth.html';
        }
    }

    function _get_current_currency() {
        return $http.get(prefix + '/currency/current').then(function (promise) {
            return promise.data;
        })
    }


    function _update(currencies) {
        return $http.post(prefix + '/currency/current', currencies).then(function (promise) {
            return promise.data;
        }, function (error) {
            return error;
        })
    }

    $scope.init = function () {
        if($stateParams.id) {

        }else{
            _get_current_currency().then(function (promise) {
                $scope.current_currency = promise;
            }, function (error) {
                not_authorized(error);
            })
        }
    }
    $scope.update = function (currencies) {
        _update(currencies).then(function (promise) {
            $scope.success.flag = true;
        }, function (error) {
            $scope.error.flag = true;
        })
    }
    $scope.cancelOperationMessage = function (obj) {
        $scope[obj].flag = false;
    }
}