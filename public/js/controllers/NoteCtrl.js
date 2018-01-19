// Note controller for the notes.html view
angular.module('NoteCtrl', []).controller('NoteController', function($scope, NoteService, UserService, $route, $location){


    $scope.savedStatus = "Saved"; // Starts with status saved. 
    $scope.availableNotes = true; // Variable if notes is availeble

    // Function takes user ID and return users notes. 
    NoteService.get($scope.currentUser.data._id).then(function(data) {
        if (data.data.notes.length === 0) { // IF no notes returns function and set availableNOtes false.
            $scope.availableNotes = false;
            return;
        }
        $scope.notes = data.data.notes; // If notes found binds notes to scope. 
    }, function(e) {
        console.log(e); // Collects errors. 
    });
     
    // Function adds new note. Takes no arguments. 
    $scope.addNote = function() {
        var note = {};
        note.author = $scope.currentUser.data._id;
        NoteService.post(note).then(function(data) {
            $route.reload(); // If succes relouds the list. 
        }, function(e) {
            console.log(e); // Collects error
        });
    };
    
    // This functions runs on changes to the forms.  Takes not
    $scope.updateNote = function(note) {
        var timeoutId;
        $scope.savedStatus = "Saving note"; // When called sets save status to Saving note
        clearTimeout(timeoutId); 
        timeoutId = setTimeout(function() { 
            NoteService.patch(note).then(function(data) { // API call to NoteService.patch
                $scope.savedStatus = "Saved"; // when API call successfull sataus = saved. 
            }, function(e) {
                console.log(e); // Collects error
            });
        }, 1000); // Runs 1s after last change. TO prevent it running hundreds of times in vein. 
    };

    // Function to delete note. Takes note ID
    $scope.deleteNote = function(id) {
        NoteService.delete(id).then(function(data) {
            $route.reload(); // Reloads the note id success
        }, function(e) {
            console.log(e); // Collects error
        });
    };

    // Logout function from UserService
    $scope.logout = function() {
        UserService.logoutUser().then(function(data) {
            $location.url('/home'); // redirects back to home page
            console.log('User logged out'); // Logs logged out to console. 
        }, function(e) {
            console.log(e); // Collects error
        });
    }

    $scope.idSelectedNote = 0; // Starts with the first note as selected. 
    // Set selected note to know wich note to view in full. 
    $scope.setSelected = function (idSelectedNote) {
        $scope.idSelectedNote = idSelectedNote;
    }; 
});