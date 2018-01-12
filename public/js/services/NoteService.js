angular.module('NoteService', []).factory('NoteService', ['$http', ($http) => {

    return {
        // call to get all nerds
        get : function(id) {
            return $http.get('/notes/' + id);
        },

        post : function(id) {
            return $http.post('/notes', id);
        },

        patch : function(note) {
            console.log(note._id);
            return $http.patch('/note/'+note._id, note);
        }

    };       

}]);
