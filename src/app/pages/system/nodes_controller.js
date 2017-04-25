function  create_nodes_controller($scope, $http, $window, $stateParams) {

    $scope.test = "Users Controller"

    var url_prefix = '/superuser/';

    function _init_list() {
        return $http.get(url_prefix + "authentication_node/").then(function (promise) {
            return promise.data
        }, function (error) {
            console.log(error);
            // $window.location.href = '/auth.html';
        })
    }

    function _init_edit(name) {
        return $http.get(url_prefix + "authentication_node/" + name).then(function (promise) {
            return promise.data;
        }, function (error) {
            console.log(error);
            // $window.location.href = '/auth.html';
        })
    }

    function _create_node(user) {
        return $http.post(url_prefix + "authentication_node/", user).then(function (promise) {
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
        return nodes.map(function (node) {
            return node.name
        })
    }

    $scope.create_node = function (user) {
        _create_node(user).then(function (promise) {

        }, function (error) {

        })
    }

    $scope.update_user = function (user) {
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
        var name = $stateParams.name;
        if (name && name == 'new') {
            $scope.node_new = true;
            $scope.stage = true
        }
        else if (name) {
            this.customer_id = name;
            _init_edit(name).then(function (promise) {
                $scope.node = promise;
            });
            $scope.stage = true
        } else {
            $scope.stage = false;
            _init_list().then(function (promise) {
                $scope.nodes = promise;
                $scope.nodesReady = true;
            })
        }
    }

}/**
 * Created by kshakirov on 4/25/17.
 */
