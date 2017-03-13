function _create_customers_controller($scope, $http,
                                      $window, $stateParams) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;
    var url_prefix = '/admin/'

    function _init_edit(id) {
        $scope.stage = true;
        $scope.customer_id = id;
        $http.get(url_prefix + 'customer/' + id).then(function (promise) {
            console.log(promise.data);
            $scope.customer = promise.data;

        })
    }

    function _init_new() {
        this.customer_new = true;
        this.stage = true;
    }

    function save_customer(customer_data) {
        return $http.post(url_prefix + "customer/new/", customer_data).then(function (promise) {
            return promise;
        })
    }

    function create_order(customer_id) {
        return $http.put(url_prefix + "customer/" + customer_id + "/order/new/", {}).then(function (promise) {
            return promise;
        })
    }


    function reset_password(email) {
        var data = {email: email};
        return $http.put(url_prefix + "customer/password/reset/", data).then(function (promise) {
            return promise;
        })
    }


    function _init_list() {
        return $http.get(url_prefix + "customer/").then(function (promise) {
            $scope.customers = promise.data;
            $scope.customersReady = true;
        }, function (error) {
            console.log(error);
            $window.location.href = '/auth.html';
        })
    }


    $scope.init = function () {
        var id = $stateParams.id;
        if (id && id == 'new') {
            _init_new.bind($scope)();

        }
        else if (id) {
            this.customer_id = id;
            _init_edit(id);
            $scope.stage = true
        } else {
            $scope.stage = false;
            _init_list();
        }
    }

    $scope.create_customer = function (customer_data) {
        save_customer(customer_data).then(function (promise) {
            $scope.customer_saved_data = promise.data;
        })
    };

    $scope.reset_password = function (email) {
        reset_password(email).then(function (promise) {
            $scope.customer_reset_password = promise.data;
        })
    };

    $scope.create_order = function (customer_id) {
        create_order(customer_id).then(function (promise) {
            $scope.customer_created_order = promise.data;
        })
    }
    


}