angular.module('NoteCtrl', []).controller('NoteController', function($scope, Note){

  
    $scope.availableNotes = true;
    Note.get().then(function(data) {
        if (data.data.notes.length === 0) {
            $scope.availableNotes = false;
            return;
        }
        
        $scope.notes = data.data.notes;
    });
        
    $scope.idSelectedNote = 0;
    $scope.setSelected = function (idSelectedNote) {
    $scope.idSelectedNote = idSelectedNote;
    }; 
});