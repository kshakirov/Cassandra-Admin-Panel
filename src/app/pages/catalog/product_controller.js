/**
 * Created by kshakirov on 3/8/17.
 */
function _create_product_controller($scope, $http, $stateParams, $location) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;
    $scope.productPageSize = 10;
    $scope.manufacturer = "Turbo International";
    $scope.manufacturers = ["Turbo International", "Garret", 'Holset', 'Mitsubishi', 'I.H.I', 'KKK', 'Schwitzer', 'Toyota'];
    $scope.part_type = "Cartridge";
    $scope.part_types = ["Turbo", "Cartridge"];
    $scope.success = {};
    var url_prefix = '/admin/'


    function _create_request(manufacturer, part_type, page_size, paging_state) {
        return {
            manufacturer: [manufacturer],
            part_type: [part_type],
            page_size: page_size,
            paging_state: paging_state
        }
    }

    function _add_new_product(sku) {
        return $http.get(url_prefix + 'new_product/' + sku).then(function (promise) {
            return promise.data.result;
        })
    }


    function _get_manufacturers() {
        return $http.get(url_prefix + 'manufacturer/').then(function (promise) {
            var manufacturers = promise.data[0].map(function (m) {
                return m[0]
            })
            return manufacturers;
        })
    }

    function _get_parts() {
        return $http.get(url_prefix + 'part_type/').then(function (promise) {
            var parts = promise.data.map(function (p) {
                return p[0]
            })
            return parts;
        })
    }


    function _get_price(id) {
        $http.get(url_prefix + 'price/' + id + '/group/').then(function (promise) {
            $scope.prices = promise.data;
        })
    }

    function _init_edit(id) {
        $scope.stage = true
        $http.get(url_prefix + 'product/' + id).then(function (promise) {
            $scope.product = promise.data;
        })
        _get_price(id);
    }

    function _init_list(request) {
        $http.post(url_prefix + 'product/paginate/', request).then(function (promise) {
            $scope.products = promise.data.results;
            $scope.last_page = promise.data.last;
            $scope.paging_state = promise.data.paging_state;
            $scope.productsReady = true;
        })
    }


    function _base_search(filter_key, filter_value, other_key, other_value, request) {
        if (filter_value != 'ALL' && other_value != 'ALL') {
            request[filter_key] = [filter_value];
            request[other_key] = [other_value];
            _init_list(request);
        } else if (filter_value == 'ALL' && other_value == 'ALL') {
            request[filter_key] = $scope[filter_key + 's'];
            request[other_key] = $scope[other_key + 's'];
        }
        else if (filter_value == 'ALL') {
            request[filter_key] = $scope[filter_key + 's'];
            request[other_key] = [other_value];
        }
        else if ( other_value == 'ALL') {
            request[filter_key] = [filter_value];
            request[other_key] = $scope[other_key + 's'];
        }
    }

    $scope.filterChange = function (filter_key, filter_value, other_key, other_value) {
        var request = _create_request($scope.manufacturer,
            $scope.productPartType, $scope.productPageSize, null);
        _base_search(filter_key, filter_value, other_key, other_value, request);
        _init_list(request);

    }

    $scope.nextPage = function (filter_key, filter_value, other_key, other_value) {
        var request = _create_request($scope.manufacturer,
            $scope.productPartType, $scope.productPageSize, $scope.paging_state);
        _base_search(filter_key, filter_value, other_key, other_value, request);
        _init_list(request);
    }

    $scope.addToNewProduct = function (sku) {
        _add_new_product(sku).then(function () {
            $scope.success.new_product = true;
        })
    }

    $scope.init = function () {
        if ($stateParams.id) {
            _init_edit($stateParams.id)
            $scope.stage = true
        } else {
            $scope.stage = false;
            var request = _create_request($scope.manufacturer,
                $scope.part_type, $scope.productPageSize, null);
            _get_manufacturers().then(function (promise) {
                $scope.manufacturers = promise;
                $scope.manufacturers.push("ALL")
            }).then(function (promise) {
                _get_parts().then(function (promise) {
                    $scope.part_types = promise;
                    $scope.part_types.push("ALL")
                })
            }).then(function (promise) {
                _init_list(request);
            })

        }
    }

    $scope.cancel_alert = function (object, property) {
        $scope[object][property] = false;
    }
    $scope.loadBySku = function (sku) {
        $location.path("/catalog/product/" + sku)
    }
}