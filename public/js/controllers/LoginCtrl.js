// Controlles for login.html
angular.module('LoginCtrl', []).controller('LoginController', function($scope, UserService, $location,$rootScope) {

    // Function to login user. Takes user as argument. 
    $scope.login = function(user) {
        user.email = angular.lowercase(user.email); // Take email and make it lowercase. 
        UserService.loginUser(user).then(function(data) { // Makes API call usen UserService
            if (data.data !== null) // If not null sets currentUser. 
            {
                $rootScope.currentUser = data.data;
                $location.url("/");
            }
        }, function(e) {
            console.log(e); // Collects error
            if (e.status == 401) { // If status is unauthorized(401) message wring credentials. 
                $scope.message = "Email or password is wrong";
            }
        });
    };
});