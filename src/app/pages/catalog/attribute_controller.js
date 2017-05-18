function _create_attribute_controller($scope, $http, $stateParams, $window) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;

    $scope.types = ['decimal', 'int', 'text']
    $scope.entities = ['product', 'order', 'customer']
    $scope.units = ['INCHES', 'DEGREES', 'gr']

    function not_authorized (error, w) {
        if (error.status == 401) {
            w.location.href = '/auth.html';
        }
    }
    
    $scope.addOption = function (attribute_options) {
        if(attribute_options){
            attribute_options.push("option")
        }else{
            attribute_options = ['option']
        }
    }

    $scope.deleteOption = function (attribute_options, index) {
        attribute_options = attribute_options.splice(index,1);
    }
    


function _init_edit(id) {
        $http.get('/admin/attribute/' + id).then(function (promise) {
            $scope.attribute = promise.data;
        })
    }
    

    function _init_list() {
        $http.get("/admin/attribute/").then(function (promise) {
            $scope.attributes = promise.data;
            $scope.attributesReady = true;
        },function (error) {
                not_authorized(error, $window);
        }
        )
    }

    $scope.init = function () {
        if ($stateParams.id == 'new') {
            _init_edit($stateParams.id)
            $scope.new = true
        }else  if ($stateParams.id) {
            _init_edit($stateParams.id)
            $scope.stage = true
        }
        else {
            $scope.stage = false;
            _init_list();
        }
    }
}