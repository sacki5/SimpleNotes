angular.module('RegisterCtrl', []).controller('RegisterController', function($scope, UserService, $location, $rootScope) {

    $scope.register = function(user) {


        UserService.createUser(user).then(function(data) {
            if (data.data !== null)
            {
                $rootScope.currentUser = data.data;
                $location.url("/profile");
            } else
            {
                $scope.message = "Username or email already exist";
            }
            
        }, function(e) {
            console.log(e);
        });
    };
});