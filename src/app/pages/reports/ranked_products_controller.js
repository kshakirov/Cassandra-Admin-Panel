/**
 * Created by kshakirov on 7/6/17.
 */
function _create_rank_products_controller($scope, $http,
                                          $window, $stateParams, ElasticSearchService) {

    var persistent_query = {
        index: "development_turbo_analytics",
        type: "ProductRank",
        size: 10,
        from: 0,
        body: {
            "query": {
                "match_all": {}
            },
            "sort": [
                {
                    "times": {
                        "order": "desc"
                    }
                }
            ]
        }


    };


    $scope.init = function () {
        ElasticSearchService.search(persistent_query).then(function (promise) {
            console.log(promise);
            $scope.products = promise.hits.hits
        })
        $scope.test = "Report"
    }


}