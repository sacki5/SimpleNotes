// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider

        // home page
        
        .when('/home', {
            templateUrl : 'views/home.html',
            controller  : 'MainController'
        })

        .when('/profile', {
            templateUrl : 'views/profile.html',
            controller  : 'ProfileController',
            resolve     : {
                loggedin: checkLoggedIn,
            }
        })

        .when('/', {
            templateUrl : 'views/note.html',
            controller  : 'NoteController',
            resolve     : {
                loggedin: checkLoggedIn,
            }
        })

        .when('/register', {
            templateUrl : 'views/register.html',
            controller  : 'RegisterController',
            resolve     : {
                loggedout : checkLoggedOut,
            }
        })

        .when('/login', {
            templateUrl : 'views/login.html',
            controller  : 'LoginController',
            resolve     : {
                loggedout : checkLoggedOut,
            }
        })
        
        .otherwise({
            controller  : '404Controller',
            templateUrl : 'views/404.html'
        });

    
    $locationProvider.html5Mode(true);

}]);

function checkLoggedIn($q, $http, $location, $rootScope, $log) {
    var deferred = $q.defer();
    $http.get('/loggedin').then(function(user) {
            
            if(user.data != '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                $rootScope.currentUser = null;
                deferred.reject();
                $location.url("/home");
            }
        }, function(e) {
            console.log(e);
        });


    return deferred.promise;
}

function checkLoggedOut($q, $http, $location, $rootScope, $log) {
    var deferred = $q.defer();
    $http.get('/loggedin').then(function(user) {
            
            if(user.data == '0') {
                deferred.resolve();
            } else {
                
                deferred.reject();
                $location.url("/");
            }
        }, function(e) {
            console.log(e);
        });


    return deferred.promise;
}