// the note service handles all API calls which has something to do with notes. 

angular.module('NoteService', []).factory('NoteService', ['$http', ($http) => {

    return {
        // call to get all notes
        get : function(id) {
            return $http.get('/notes/' + id);
        },

        // API call to post new note
        post : function(id) {
            return $http.post('/notes', id);
        },

        // API call to update existing note
        patch : function(note) {
            return $http.patch('/note', note);
        },

        // Delete note
        delete : function(id) {
            return $http.delete('/note/' + id);
        }

    };       

}]);
