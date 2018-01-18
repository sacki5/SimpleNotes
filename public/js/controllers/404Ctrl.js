angular.module('404Ctrl', []).controller('404Controller', function($scope, $location, $rootScope) {

    $scope.path = $location.path();
    $scope.back = function() {
        history.back();
    };
   
});