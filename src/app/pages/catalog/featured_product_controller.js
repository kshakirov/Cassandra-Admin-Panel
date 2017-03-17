/**
 * Created by kshakirov on 3/8/17.
 */
function _create_featured_product_controller($scope, $http, $stateParams) {
    $scope.smartTablePageSize = 10;
    $scope.featuredProductsReady = false;
    var url_prefix = '/admin/'
    $scope.error = {
        add: false
    };


    function _init_list() {
        $scope.featuredProductsReady = false;
        $http.get(url_prefix + 'featured_product/').then(function (promise) {
            $scope.featuredProducts = promise.data;
            $scope.featuredProductsReady = true;
        })
    }

    function _prepare_product(item) {
        return{
            sku: item.sku,
            visible: item.visible|| false,
            ord: item.order || 100
        }
    }

    function _update(item) {
        var data = _prepare_product(item);
    return    $http.post(url_prefix + 'featured_product/', data).then(function (promise) {
            return promise;
        })
    }

    function _add(sku) {
        return $http.get(url_prefix + 'featured_product/' + sku).then(function (promise) {
            return promise.data.result;
        })
    }

    function _delete(sku) {
        return $http.delete(url_prefix + 'featured_product/' + sku).then(function (promise) {
            return promise;
        })
    }

    $scope.init = function () {
            _init_list();
    }

    $scope.updateProduct = function (product) {
        _update(product).then(function (promise) {
            _init_list();
        });
    }
    $scope.addProduct = function (sku) {
        _add(sku).then(function (promise) {
            if(promise)
                _init_list()
            else
                $scope.error.add = true;
        });
    }

    $scope.deleteProduct = function (sku) {
        _delete(sku).then(function (promise) {
            _init_list()
        });
    }

    $scope.cancel_add_error = function () {
        $scope.error.add = false;
    }
}