function _create_customers_controller($scope, $http,
                                      $window, $stateParams) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;
    $scope.statuses = ['pending', 'complete', 'paid'];
    $scope.payment_methods = ['Credit Card', 'Paypal', 'Cache'];
    $scope.future_products = [
        {name: '', quantity: 1, item_status: 'Ordered'}
    ]
    $scope.errors = {}
    $scope.success = {}

    var url_prefix = '/admin/';

    function _init_edit(id) {
        $scope.stage = true;
        $scope.customer_id = id;
        return $http.get(url_prefix + 'customer/' + id).then(function (promise) {
            $scope.customer = promise.data;
            return $scope.customer;

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

    function create_order(future_order, future_products) {
        future_order['products'] = future_products;
        return $http.post(url_prefix + "customer/" + future_order.customer_id + "/order/new/", future_order ).then(function (promise) {
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
        return $http.get(url_prefix + "customer/group/" + customer_group_id + "/product/" + sku).then(function (promise) {
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
            _init_edit(id).then(function (promise) {
                $scope.future_order = create_future_order(promise)
            });
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

    $scope.create_order = function (future_order, future_products) {
        create_order(future_order, future_products).then(function (promise) {

            $scope.success = {
                order_create: {
                    flag: true,
                    id: promise.data
                }
            };

        }, function (error) {

        })
    };

    $scope.checkPassword = function (password) {
        if (password.length > 6)
            return false;
        return true;
    }


    $scope.cancel_product_error = function () {
        $scope.errors.product_load = {
            flag: false,
            message: ""
        }
    }

    $scope.cancel_password_changed = function () {
        $scope.customer_change_password = false;
        $scope.password = null;
    }

    $scope.load_future_product = function (sku, customer_group_id, index) {
        load_product(sku, customer_group_id).then(function (promise) {
            if(!promise.hasOwnProperty('error')) {
                $scope.future_products[index] = promise;
                calculate_derived_fields($scope.future_products[index])
                calcullate_all($scope.future_order, $scope.future_products)
            }else {
                $scope.errors.product_load = {
                    flag: true,
                    message: promise.error
                }
            }
        })
    }

    $scope.changed_qty = function (index) {
        calculate_derived_fields($scope.future_products[index]);
        calcullate_all($scope.future_order, $scope.future_products)
    }

    $scope.add_shipping_handling = function (shipping_handling) {
        calcullate_all($scope.future_order, $scope.future_products)
    }

    $scope.addProductItem = function () {
        $scope.future_products.push(_add_empty_product_item());
    }

    $scope.remove_product = function (index) {
        $scope.future_products.splice(index, 1);
        calcullate_all($scope.future_order, $scope.future_products)
    }


}