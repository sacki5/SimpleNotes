angular.module('UserService', []).factory('UserService', ['$http', function($http, $log) {     

    return {
        // call to get all nerds
        createUser : function(user) {
            return $http.post('/register', user);
        },

        loginUser : function(user) {
            return $http.post('/login', user);
        },

        updateUser : function(user) {
            return $http.patch('/updateUser', user);
        },
    };  

}]);
