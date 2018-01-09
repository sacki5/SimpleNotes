angular.module('NoteService', []).factory('NoteService', ['$http', ($http) => {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/notes/123');
        }
    };       

}]);
