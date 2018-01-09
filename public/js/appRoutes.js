// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider

        // home page
        
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
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