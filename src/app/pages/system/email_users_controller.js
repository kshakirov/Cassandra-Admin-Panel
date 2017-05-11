function  create_email_user_controller($scope, $http, $window, $stateParams) {

    var url_prefix = '/admin/';
    $scope.success = {
        flag: false
    };
    $scope.error = {
        flag: false
    };

    function _init_list() {
        return $http.get(url_prefix + "admin_email/").then(function (promise) {
            return promise.data
        })
    }


    function _update(admin_email) {
        return $http.put(url_prefix + "admin_email/", admin_email).then(function (promise) {
            return promise.data
        })
    }




    $scope.init = function () {
        _init_list().then(function (promise) {
            $scope.admin_emails = promise;
        })
    }
    
    $scope.update = function (admin_email) {
        _update(admin_email).then(function (promise) {
            $scope.success.flag = true;
            $scope.error.flag = false;
        }, function (error) {
            $scope.success.flag = false;
            $scope.error.flag = true;
            $scope.error.message = error.message;
        })
    }

    $scope.cancelOperationMessage = function (obj) {
        $scope[obj].flag = false;
    }
}