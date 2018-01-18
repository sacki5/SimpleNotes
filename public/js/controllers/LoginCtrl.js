angular.module('LoginCtrl', []).controller('LoginController', function($scope, UserService, $location,$rootScope) {

    $scope.login = function(user) {

        user.email = angular.lowercase(user.email);
        UserService.loginUser(user).then(function(data) {
            if (data.data !== null)
            {
                $rootScope.currentUser = data.data;
                $location.url("/");
            }
        }, function(e) {
            console.log(e);
            if (e.status == 401) {
                $scope.message = "Email or password is wrong";
            }
        });


    };
});