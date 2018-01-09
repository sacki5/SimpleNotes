angular.module('RegisterCtrl', []).controller('RegisterController', function($scope, UserService) {

    $scope.register = function(user) {
        UserService.createUser(user).then(function(data) {
            console.log(data.data);
        }, function(e) {
            console.log(e);
        });
    };
});