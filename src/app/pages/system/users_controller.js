function  create_users_controller($scope, $http, $window, $stateParams) {
    
    $scope.table_size = 5;
    $scope.checkbox_change_password = {
        flag: false
    }

    angular.isUndefinedOrNull = function(val) {
        return angular.isUndefined(val) || val === null
    }
    
    var url_prefix = '/superuser/';

    function _init_list() {
        return $http.get(url_prefix + "user/").then(function (promise) {
            return promise.data
        })
    }

    function _init_edit(login) {
        return $http.get(url_prefix + "user/" + login).then(function (promise) {
            return promise.data;
        })
    }

    function _create_user(user) {
        return $http.post(url_prefix + "user/", user).then(function (promise) {
        })
    }

    function _update_user(user) {
        return $http.put(url_prefix + "user/" + user.login, user).then(function (promise) {
        })
    }


    function _init_nodes() {
        return $http.get(url_prefix + "authentication_node/").then(function (promise) {
            return promise.data;
        })
    }

    function flatten_nodes(nodes) {
        var nodes = nodes.map(function (node) {
            return node.name
        })
        nodes.push('Internal')
        return nodes;
    }
    
    function render_error(error) {
        var error_object = {
            flag: true,
            message: error.data.message
        }
        return error_object;
    }


    function notify_success(message) {
        var success = {
            flag: true,
            message: message
        }
        return success;
    }

    function notify_update(user) {
        user.password = null;
        user.confirmation = null;
    }

    function _create_object(keys, user) {
        var object = {};
        angular.forEach(keys, function (key) {
            object[key] = user[key];
        })
        return object;
    }

    function _remove_null_values(user) {
        var keys = Object.keys(user);
        keys = keys.filter(function (key) {
            if(!angular.isUndefinedOrNull(user[key])){
                return key
            }
        })
        return _create_object(keys, user);
    }

    $scope.create_user = function (user) {
        var user = user;
        delete user.confirmation;
        _create_user(user).then(function (promise) {
            $scope.success = notify_success("User Successfully Created")
        }, function (error) {

        })
    }

    $scope.update_user = function (user) {
        var user =_remove_null_values(user);
        delete user.confirmation;
        _create_user(user).then(function (promise) {
            $scope.checkbox_change_password.flag = false;
            notify_update(user)
            $scope.success = notify_success("User Successfully Updated")
        }, function (error) {

        })
    }
    
    $scope.delete_user = function (user) {
        return $http.delete(url_prefix + "user/" + user.login).then(function (promise) {
            $scope.success = notify_success("User Successfully Deleted");
        }, function (error) {
        })
    }
    
    $scope.force_change = function (value) {
        $scope.user.password = null;
        $scope.user.confirmation = null;
    }
    
    $scope.change_password = function (user, change_flag) {
        if (user.authentication_node=='Internal' &&  change_flag)
            return true;
        return false
    }
    
    $scope.cancel_alert = function (key) {
        this[key]['flag'] = false;
    }


    function _verify_password(user) {
        if(angular.isUndefinedOrNull(user.password)){
            return true;
        }else{
            if(user.password==user.confirmation && user.password.length > 0){
                return false
            }
            return true;
        }
    }

    $scope.verify_update_data = function (user, checkbox_change_password) {
        if(user.authentication_node=='Internal'
            && checkbox_change_password.authentication_node != 'Internal')
            return _verify_password(user);
        return false;
    }
    
    function _check_required_fields(user) {
        var keys = ['login','name','authentication_node'];
        for(var i=0;i<3;i++){
            if(angular.isUndefinedOrNull(user[keys[i]])){
                return true;
            }else if(user[keys[i]].length <= 0){
                return true
            }
        }
        return false;
    }

    $scope.verify_create_data = function (user) {
        if(!angular.isUndefinedOrNull(user)) {
           if(_check_required_fields(user)){
                return true;
           }else {
               if(user.authentication_node!='Internal'){
                   return false;
               }else{
                   return _verify_password(user)
               }
           }
            return false;
        }else{
            return true;
        }
    }


    $scope.init = function () {
        var login = $stateParams.login;
        if (login && login == 'new') {
            $scope.user_new = true;
            _init_nodes().then(function (promise) {
                $scope.authentication_nodes = flatten_nodes(promise);
            })
        }
        else if (login) {
            this.customer_id = login;
            _init_nodes().then(function (promise) {
                $scope.authentication_nodes = flatten_nodes(promise);
            })
            _init_edit(login).then(function (promise) {
                $scope.user = promise;
                $scope.checkbox_change_password.authentication_node= promise.authentication_node;
            });
            $scope.stage = true
        } else {
            $scope.stage = false;
            _init_list().then(function (promise) {
                $scope.customers = promise;
                $scope.customersReady = true;
            }, function (error) {
                $scope.error = render_error(error)
            })
        }
    }
    
}