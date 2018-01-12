angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, UserService, $location,$rootScope) {

    $scope.updateUser = function(user) {

        UserService.updateUser(user).then(function(data) {
            if(data.data !== 1) {
                $scope.message = 'Something went wrong';
            }

            $scope.message = 'User updated';
            
        });
    };
});