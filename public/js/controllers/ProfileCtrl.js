angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, UserService, $location,$rootScope) {

    $scope.updateUser = function(user) {

        UserService.updateUser(user).then(function(data) {
            console.log(data);
        });

    };

});