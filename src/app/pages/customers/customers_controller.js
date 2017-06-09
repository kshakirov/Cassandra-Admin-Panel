function _create_customers_controller($scope, $http,
                                      $window, $stateParams, $q) {
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
        return $http.get(url_prefix + 'customer/' + id).then(function (promise) {
            return promise.data;
        })
    }

    function _init_edit_by_email(email) {
        return $http.get(url_prefix + 'customer/email/' + email).then(function (promise) {
          return promise.data;
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
        return $http.post(url_prefix + "customer/" + future_order.customer_id + "/order/new/", future_order).then(function (promise) {
            return promise;
        }, function (error) {
            return $q.reject();
        })
    }

    function reset_password(email) {
        var data = {email: email};
        return $http.post(url_prefix + "customer/password/reset/", data).then(function (promise) {
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


    function _init_customer_groups() {
        return $http.get(url_prefix + "customer_group/").then(function (promise) {
            return promise.data;
        }, function (error) {
            console.log(error);
            $window.location.href = '/auth.html';
        })
    }

    function _group_objs_2_str(groups) {
        return groups.map(function (group) {
            return group.code
        })
    }

    function _is_email(id) {
        return id.search('@') > 0
    }


    $scope.init = function () {
        var id = $stateParams.id;
        _init_customer_groups().then(function (promise) {
            $scope.customerGroups = _group_objs_2_str(promise);
        })
        if (id && id == 'new') {
            _init_new.bind($scope)();

        }
        else if (id) {
            this.customer_id = id;
            if (_is_email(id)) {
                _init_edit_by_email(id).then(function (promise) {
                    $scope.customer = promise;
                    $scope.customer_id = $scope.customer.id;
                }, function (error) {
                    $scope.error = error.data;
                })
            } else {
                _init_edit(id).then(function (promise) {
                    $scope.customer = promise;
                    $scope.customer_id = $scope.customer.id;
                    $scope.future_order = create_future_order(promise)
                });
            }
            $scope.stage = true
        } else {
            $scope.stage = false;
            _init_list();
        }
    }

    $scope.create_customer = function (customer_data) {
        save_customer(customer_data).then(function (promise) {
            $scope.customer_saved_data = promise.data;
        }, function (error) {
            console.log(error);
            $scope.customer_email_error = {
                flag: true,
                msg: error.data.message
            };
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
        if (_check_products(future_products)) {
            create_order(future_order, future_products).then(function (promise) {

                $scope.success = {
                    order_create: {
                        flag: true,
                        id: promise.data
                    }
                };

            }, function (error) {

            })
        } else {
            $scope.errors.product_table = {
                flag: true
            }
        }
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


    $scope.cancel_product_table_error = function () {
        $scope.errors.product_table = {
            flag: false
        }
    }

    $scope.cancel_password_changed = function () {
        $scope.customer_change_password = false;
        $scope.password = null;
    }

    $scope.cancel_email_error = function () {
        $scope.customer_email_error.flag = false;
    };

    $scope.load_future_product = function (sku, customer_group_id, index) {
        load_product(sku, customer_group_id).then(function (promise) {
            if (!promise.hasOwnProperty('error')) {
                $scope.future_products[index] = promise;
                calculate_derived_fields($scope.future_products[index])
                calcullate_all($scope.future_order, $scope.future_products)
            } else {
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