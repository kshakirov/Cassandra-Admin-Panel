function  create_users_controller($scope, $http, $window, $stateParams) {
    
    $scope.table_size = 5;

    var url_prefix = '/superuser/';

    function _init_list() {
        return $http.get(url_prefix + "user/").then(function (promise) {
            return promise.data
        }, function (error) {
            console.log(error);
           // $window.location.href = '/auth.html';
        })
    }

    function _init_edit(login) {
        return $http.get(url_prefix + "user/" + login).then(function (promise) {
            return promise.data;
        }, function (error) {
            console.log(error);
            // $window.location.href = '/auth.html';
        })
    }

    function _create_user(user) {
        return $http.post(url_prefix + "user/", user).then(function (promise) {
        }, function (error) {
            console.log(error);
            // $window.location.href = '/auth.html';
        })
    }

    function _update_user(user) {
        return $http.put(url_prefix + "user/" + user.login, user).then(function (promise) {
        }, function (error) {
            console.log(error);
            // $window.location.href = '/auth.html';
        })
    }


    function _init_nodes() {
        return $http.get(url_prefix + "authentication_node/").then(function (promise) {
            return promise.data;
        }, function (error) {
            console.log(error);
            // $window.location.href = '/auth.html';
        })
    }

    function flatten_nodes(nodes) {
        var nodes = nodes.map(function (node) {
            return node.name
        })
        nodes.push('Internal')
        return nodes;
    }

    $scope.create_user = function (user) {
        var user = user;
        delete user.confirmation;
        _create_user(user).then(function (promise) {

        }, function (error) {

        })
    }

    $scope.update_user = function (user) {
        var user = user;
        delete user.confirmation;
        _create_user(user).then(function (promise) {

        }, function (error) {

        })
    }
    
    $scope.delete_user = function (user) {
        return $http.delete(url_prefix + "user/" + user.login).then(function (promise) {
        }, function (error) {
            console.log(error);
            // $window.location.href = '/auth.html';
        })
    }


    $scope.init = function () {
        var login = $stateParams.login;
        if (login && login == 'new') {
            $scope.user_new = true;
            $scope.stage = true
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
            });
            $scope.stage = true
        } else {
            $scope.stage = false;
            _init_list().then(function (promise) {
                $scope.customers = promise;
                $scope.customersReady = true;
            })
        }
    }
    
}