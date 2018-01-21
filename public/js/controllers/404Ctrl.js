// Controller for view 404.html         
angular.module('404Ctrl', []).controller('404Controller', function($scope, $location, $rootScope) {

    $scope.path = $location.path(); // Current url. 

    // returns user to previus location;
    $scope.back = function() {
        history.back();
    };
   
});