// the note service handles all API calls which has something to do with users.
angular.module('UserService', []).factory('UserService', ['$http', function($http, $log) {     

    return {
        // call to create new user
        createUser : function(user) {
            return $http.post('/register', user);
        },

        // Call to login user
        loginUser : function(user) {
            return $http.post('/login', user);
        },

        // Call to update existing user information
        updateUser : function(user) {
            return $http.patch('/updateUser', user);
        },

        // Logout the current logged in user.
        logoutUser : function() {
            return $http.get('/logout');
        }

    };  

}]);
