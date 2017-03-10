/**
 * Created by kshakirov on 3/8/17.
 */
function _create_product_controller($scope, $http, $stateParams) {
    $scope.hello = "Test Product"
    $scope.test = "Test"
    $scope.smartTablePageSize = 10;
    $scope.stage = false;


    function _get_price(id) {
        $http.get('/admin/price/' + id + '/group/' ).then(function (promise) {
            $scope.prices = promise.data;
        })
    }

    function _init_edit(id) {
        $scope.stage = true
        $http.get('/admin/product/' + id).then(function (promise) {
            $scope.product = promise.data;
        })
        _get_price(id);
    }

    function _init_list(request) {
        $http.post('/admin/product/paginate/', request).then(function (promise) {
            $scope.products = promise.data.results;
            $scope.last_page = promise.data.last;
            $scope.paging_state = promise.data.paging_state;
            $scope.productsReady = true;
        })
    }

    $scope.nextPage = function () {
        console.log(this.paging_state);
        var request = {paging_state: this.paging_state};
        _init_list(request);
    }

    $scope.init = function () {
        if ($stateParams.id) {
            _init_edit($stateParams.id)
            $scope.stage = true
        } else {
            $scope.stage = false;
            var request = {paging_state: null};
            _init_list(request);
        }
    }
}