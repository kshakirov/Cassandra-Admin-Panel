function _create_attribute_controller($scope, $http, $stateParams, $window) {
    $scope.smartTablePageSize = 10;
    $scope.stage = false;

    $scope.types = ['decimal', 'int', 'text', 'boolean']
    $scope.entities = ['product', 'order', 'customer']
    $scope.units = ['INCHES', 'DEGREES', 'gr']

    $scope.cancel_alert = function (key) {
        this[key]['flag'] = false;
    }

    function notify_success(message) {
        var success = {
            flag: true,
            message: message
        }
        return success;
    }

    function notify_success(message) {
        var success = {
            flag: true,
            message: message
        }
        return success;
    }
    
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
        $http.get('/admin/attributes/' + id).then(function (promise) {
            $scope.attribute = promise.data;
        })
    }
    

    function _init_list() {
        $http.get("/admin/attributes").then(function (promise) {
            $scope.attributes = promise.data;
            $scope.attributesReady = true;
        },function (error) {
                not_authorized(error, $window);
        }
        )
    }

    function _create(attribute) {
        return $http.post('/admin/attributes', attribute).then(function (promise) {
            return promise.data;
        })
    }
    

    $scope.readyToSubmit = function (attribute) {
        if(attribute.type && attribute.entity && attribute.label){
            return false;
        }
        return true;
    }
    
    $scope.createAttribute = function (attribute) {
        _create(attribute).then(function (promise) {
            $scope.success = notify_success("Attribute Successfully Saved")
        }, function (error) {
            $scope.error = render_error(error)
        })
    }
    
    $scope.init = function () {
        if ($stateParams.id == 'new') {
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