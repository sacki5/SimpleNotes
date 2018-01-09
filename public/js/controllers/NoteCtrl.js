angular.module('NoteCtrl', []).controller('NoteController', function($scope, NoteService){

  
    $scope.availableNotes = true;
    NoteService.get().then(function(data) {
        if (data.data.notes.length === 0) {
            $scope.availableNotes = false;
            return;
        }
        $scope.notes = data.data.notes;
    }, function(e) {
        console.log(e);
    });
        
    $scope.idSelectedNote = 0;
    $scope.setSelected = function (idSelectedNote) {
    $scope.idSelectedNote = idSelectedNote;
    }; 
});