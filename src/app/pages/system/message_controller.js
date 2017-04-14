function create_message_controller($scope, $http, $window, $stateParams) {
    $scope.success = {flag: false};
    $scope.page_size = 5;
    $scope.error = {
        flag: false
    }

    var prefix = '/admin/';

    function not_authorized(error) {
        if (error.status == 401) {
            $window.location.href = '/auth.html';
        }
    }

    function _get_messages(filters) {
        return $http.post(prefix + '/message/paginate', filters).then(function (promise) {
            return promise.data;
        })
    }


    $scope.search = function (sender) {
        $scope.sender = sender;
        $scope.nextPage();
    }

    $scope.nextPage = function () {
        var filters = {
            sender: $scope.sender,
            paging_state: $scope.paging_state,
            page_size: $scope.page_size
        };
        _get_messages(filters).then(function (promise) {
            $scope.messages = promise.results;
            $scope.paging_state = promise.paging_state;
            $scope.last = promise.last;
        })
    };


    $scope.notSearchCritiria = function (sender, recepient) {
        if (angular.isNull(sender))
            return true;
        return false;
    }

    $scope.init = function () {
        var filters = {paging_state: null, page_size: $scope.page_size};
        _get_messages(filters).then(function (promise) {
            $scope.messages = promise.results;
            $scope.paging_state = promise.paging_state;
            $scope.last = promise.last;
        }, function (error) {
            not_authorized(error);
        })
    }
}