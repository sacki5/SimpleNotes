angular.module('NoteCtrl', []).controller('NoteController', function($scope, NoteService, UserService, $route, $location){

    $scope.savedStatus = "Saved";
    $scope.availableNotes = true;
    NoteService.get($scope.currentUser.data._id).then(function(data) {
        if (data.data.notes.length === 0) {
            $scope.availableNotes = false;
            return;
        }
        $scope.notes = data.data.notes;
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
    
    var timeoutId;
    $scope.updateNote = function(note) {
        $scope.savedStatus = "Saving note";
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            NoteService.patch(note).then(function(data) {
                $scope.savedStatus = "Saved";
            }, function(e) {
                console.log(e);
            });
        }, 1000);
    };

    $scope.deleteNote = function(id) {
        NoteService.delete(id).then(function(data) {
            $route.reload();
        }, function(e) {
            console.log(e);
        });
    };

    $scope.logout = function() {
        UserService.logoutUser().then(function(data) {
            $location.url('/home');
            console.log('User logged out');
        }, function(e) {
            console.log(e);
        });
    }

    $scope.idSelectedNote = 0;
    $scope.setSelected = function (idSelectedNote) {
        $scope.idSelectedNote = idSelectedNote;
    }; 
});