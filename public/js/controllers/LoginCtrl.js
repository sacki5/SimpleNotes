angular.module('LoginCtrl', []).controller('LoginController', function($scope, UserService, $location,$rootScope) {

    $scope.login = function(user) {


        UserService.loginUser(user).then(function(data) {
            if (data.data !== null)
            {
                $rootScope.currentUser = data.data;
                $location.url("/profile");
            } else
            {
                $scope.message = "Email or password is wrong";
            }
        }, function(e) {
            console.log(e);
        });


    };
});