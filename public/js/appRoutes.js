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
        });


    $locationProvider.html5Mode(true);

}]);