// This controller handles reigster.html view. 
angular.module('RegisterCtrl', []).controller('RegisterController', function($scope, UserService, $location, $rootScope) {

    // This function takes user information and creates a new user with UserService. 
    $scope.register = function(user) {
        UserService.createUser(user).then(function(data) {
            if (data.data !== null) // Success
            {
                $rootScope.currentUser = data.data;
                $location.url("/profile");
            } else // Failed to create.
            {
                $scope.message = "Username or email already exist";
            }
            
        }, function(e) {
            console.log(e); // Collects error. 
        });
    };
});