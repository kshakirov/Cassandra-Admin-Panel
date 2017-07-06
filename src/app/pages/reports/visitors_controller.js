function _create_visitors_controller($scope, $http,
                                          $window, $stateParams, ElasticSearchService) {

    var persistent_query = {
        index: "development_turbo_analytics",
        type: "VisitorLog",
        size: 10,
        from: 0,
        body: {
            "query": {
                "match_all": {}
            },
            "sort": [
                {
                    "date": {
                        "order": "desc"
                    }
                }
            ]
        }


    };


    $scope.init = function () {
        ElasticSearchService.search(persistent_query).then(function (promise) {
            console.log(promise);
            $scope.visitors = promise.hits.hits
        })
        $scope.test = "Report"
    }


}