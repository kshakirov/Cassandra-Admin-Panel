function create_template_controller($scope, $http, $window, $stateParams) {
    $scope.test = true;
    var prefix = '/admin/';
    function load_file(template_name) {
        return $http.get(prefix + 'template/' + template_name).then(function (promise) {
            return promise.data;
        })
    }

    function save_file(fileObject) {
        return $http.post(prefix + 'template/', fileObject).then(function (promise) {
            return promise;
        })
    }

    function preview_file(fileObject) {
        return $http.put(prefix + 'template/preview', fileObject).then(function (promise) {
            return promise.data;
        })
    }
    
    $scope.init = function () {
        load_file('place_order.html.erb').then(function (promise) {
            $scope.fileObject = promise;
        })
    }

    $scope.loadFile = function (filename) {
        load_file(filename).then(function (promise) {
            $scope.fileObject = promise;
        })
    }

    $scope.save = function (fileObject) {
        save_file(fileObject).then(function (promise) {
            console.log(promise)
        })
    }

    $scope.edit = function () {
        $scope.previewFlag = false;
    }

    $scope.preview = function (fileObject) {
        preview_file(fileObject).then(function (promise) {
             $scope.previewObject = promise;
            $scope.previewFlag= true;
        })
    }
}