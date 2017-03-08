/**
 * Created by kshakirov on 3/8/17.
 */
function _create_product_controller($scope,$http, $stateParams) {
    $scope.hello = "Test Product"
    $scope.test = "Test"
    $scope.smartTablePageSize = 10;
    $scope.stage = false;




    function _init_edit(id) {
        $scope.stage = true
        $http.get('/admin/product/' + id).then(function (promise) {
            $scope.product = promise.data;
        })
    }

    function _init_list_by_customer(customer) {
        $http.get('/admin/customer/' + customer + '/order/').then(function (promise) {
            $scope.orders = promise.data;
            $rootScope.orders = promise.data;
            $scope.ordersReady = true;
        });
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
            if($stateParams.id=='all' && $stateParams.customer){
                _init_list_by_customer($stateParams.customer);
                $scope.stage = false
            }else {
                _init_edit($stateParams.id)
                $scope.stage = true
            }

        } else {
            $scope.stage=false;
            var request ={paging_state: null};
            _init_list(request);
        }
    }
}