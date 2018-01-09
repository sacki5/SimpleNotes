angular.module('LoginCtrl', []).controller('LoginController', function($scope, UserService) {

    $scope.login = function(user) {
        UserService.loginUser(user).then(function(data) {
            console.log(data.data);
        }, function(e) {
            console.log(e);
        });
    };
});