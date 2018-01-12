angular.module('NoteCtrl', []).controller('NoteController', function($scope, NoteService, $route){

  
    $scope.availableNotes = true;
    NoteService.get($scope.currentUser.data._id).then(function(data) {
        if (data.data.notes.length === 0) {
            $scope.availableNotes = false;
            return;
        }
        $scope.notes = data.data.notes;
        console.log($scope.notes);
    }, function(e) {
        console.log(e);
    });
        

    $scope.addNote = function() {
        console.log('add note called');
        var note = {};
        note.author = $scope.currentUser.data._id;
        NoteService.post(note).then(function(data) {
            $route.reload();
        }, function(e) {
            console.log(e);
        });
    };
    
    $scope.updateNote = function(note) {
        NoteService.patch(note).then(function(data) {
            
        }, function(e) {
            console.log(e);
        });
    };

    $scope.idSelectedNote = 0;
    $scope.setSelected = function (idSelectedNote) {
    $scope.idSelectedNote = idSelectedNote;
    }; 
});