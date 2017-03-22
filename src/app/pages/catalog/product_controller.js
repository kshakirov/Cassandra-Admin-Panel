/**
 * Created by kshakirov on 3/8/17.
 */
function _create_product_controller($scope, $http, $stateParams) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;
    $scope.productPageSize = 10;
    $scope.productManufacturer = "Turbo International";
    $scope.productManufacturers = ["Turbo International", "Garret", 'Holset', 'Mitsubishi', 'I.H.I', 'KKK', 'Schwitzer', 'Toyota'];
    $scope.productPartType = "Cartridge";
    $scope.productPartTypes = ["Turbo", "Cartridge"];
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


    function _get_price(id) {
        $http.get( url_prefix + 'price/' + id + '/group/').then(function (promise) {
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

    $scope.filterChange = function (filter_key, filter_value) {
        var request = _create_request($scope.productManufacturer,
            $scope.productPartType, $scope.productPageSize, null);
        request[filter_key] = [filter_value];
        _init_list(request);
    }

    $scope.nextPage = function () {
        console.log(this.paging_state);
        var request = _create_request($scope.productManufacturer,
            $scope.productPartType, $scope.productPageSize, $scope.paging_state);
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
            var request = _create_request($scope.productManufacturer,
                $scope.productPartType, $scope.productPageSize, null);
            _init_list(request);
        }
    }
    
    $scope.cancel_alert = function (object, property) {
        $scope[object][property] = false;
    }
    $scope.search = function (manufacturers, part_types, page_size) {

    }
}