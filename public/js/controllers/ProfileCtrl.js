// Controller for the profile.html view
angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, UserService, $location,$rootScope) {

    // Takes user information and makes API call to update. 
    $scope.updateUser = function(user) {
        UserService.updateUser(user).then(function(data) {
            if(data.data != 1) { // If flag not 1. Everything is okey and user is updated. 
                $scope.message = 'Something went wrong';
            } else {
                $scope.message = 'User updated';
            }   
        }, function(e) {
            console.log(e); // Collects error
        });
    };
});