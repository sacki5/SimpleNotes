angular.module('NoteService', []).factory('Note', ['$http', ($http) => {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/notes/1232');
        }
    };       

}]);
