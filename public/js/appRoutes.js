// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider

        // home page
        
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller : 'ProfileController',
            resolve    : {
              loggedin : checkLoggedIn
            }
        })

        .when('/notes', {
            templateUrl: 'views/note.html',
            controller: 'NoteController'
        })

        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        });

    
    $locationProvider.html5Mode(true);

}]);

function checkLoggedIn($q, $http, $location, $rootScope, $log) {
    var deferred = $q.defer();
    $http.get('/loggedin')
    .success(function(user) {
        if(user != '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            $rootScope.currentUser = null;
            deferred.reject();
            $location.url("/login");   
        }
    });

    return deferred.promise;
}