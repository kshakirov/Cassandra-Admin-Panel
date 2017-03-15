function _create_customers_controller($scope, $http,
                                      $window, $stateParams) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;
    
    $scope.future_products = [
        {name: '', quantity: 1}
    ]

    var url_prefix = '/admin/';

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

    function calculate_derived_fields(item) {
        item.subtotal = item.quantity * item.price;
        item.tax_amount = item.tax_percent /100 * item.price;
        item.row_total  = item.subtotal + item.tax_amount - item.discount_amount

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

    function change_password(email, password) {
        var data = {email: email, password: password};
        return $http.put(url_prefix + "customer/password/change/", data).then(function (promise) {
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


    function load_product(sku, customer_group_id) {
        var data = {sku: sku, customer_group_id: customer_group_id};
        return $http.get(url_prefix + "customer/group/" +  customer_group_id +"/product/" + sku).then(function (promise) {
            return promise.data;
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
    $scope.change_password = function (email, password) {
        change_password(email, password).then(function (promise) {
            $scope.customer_change_password = promise.data;
            $scope.password = "";
        })
    };

    $scope.create_order = function (customer_id) {
        create_order(customer_id).then(function (promise) {
            $scope.customer_created_order = promise.data;
            if ($scope.customer_created_order.length == 0) {
                $scope.emptyCart = true;
            }
        })
    };

    $scope.checkPassword = function (password) {
        if(password.length > 6)
            return false;
        return true;
    }


    $scope.cancel_empty_cart = function () {
        $scope.emptyCart = false;
        $scope.customer_created_order = null;
    }

    $scope.cancel_password_changed = function () {
        $scope.customer_change_password = false;
        $scope.password = null;
    }

    $scope.load_future_product = function ( sku, customer_group_id, index) {
        load_product(sku, customer_group_id).then(function (promise) {
            console.log(promise);
            $scope.future_products[index] = promise;
            calculate_derived_fields($scope.future_products[index])
        })
    }
    
    $scope.changed_qty = function (index) {
        calculate_derived_fields($scope.future_products[index ])
    }


}