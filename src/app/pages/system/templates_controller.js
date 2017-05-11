function create_template_controller($scope, $http, $window, $stateParams) {
    $scope.test = true;
    var prefix = '/admin/';


    function _init_admin_emails_list() {
        return $http.get(prefix + "admin_email/").then(function (promise) {
            return promise.data
        })
    }

    function _set_current_admin_email(admin_emails, fileObject) {
        var current_admin_email = null;
        angular.forEach(admin_emails, function (email) {
            if(email.code==fileObject.admin_email.code) {
                current_admin_email = email;
            }
        })
        return current_admin_email;
    }

    function _prepare_admin_emails(admin_emails) {
        return admin_emails.map(function (email) {
            email.label = email.sender_name + " <" + email.sender_email + ">";
            return email;
        })
    }

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
        load_file('order').then(function (promise) {
            $scope.fileObject = promise;
        }).then(function (promise) {
            _init_admin_emails_list().then(function (promise) {
                $scope.admin_emails = _prepare_admin_emails(promise);
                $scope.fileObject.admin_email = _set_current_admin_email(promise, $scope.fileObject)
            })
        })
    }

    $scope.loadFile = function (filename) {
        load_file(filename).then(function (promise) {
            $scope.fileObject = promise;
        }).then(function (promise) {
            _init_admin_emails_list().then(function (promise) {
                $scope.admin_emails = _prepare_admin_emails(promise);
                $scope.fileObject.admin_email = _set_current_admin_email(promise, $scope.fileObject)
            })
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