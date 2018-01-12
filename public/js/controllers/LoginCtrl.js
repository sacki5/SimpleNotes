angular.module('LoginCtrl', []).controller('LoginController', function($scope, UserService, $location,$rootScope) {

    $scope.login = function(user) {


        UserService.loginUser(user).then(function(data) {
            if (data.data !== null)
            {
                $rootScope.currentUser = data.data;
                $location.url("/");
            }
        }, function(e) {
            if (e.status == 401) {
                $scope.message = "Email or password is wrong";
            }
        });


    };
});