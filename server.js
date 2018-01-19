
// Config files
require('./config/config');

// modules
////////////////////////////
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const { mongoose } = require('./config/mongoose');
const { Note } = require('./models/note');
const { User} = require('./models/user');

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'ZsssCrHDg2qKZdENtrBbMao7'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// Passport configuration
////////////////////////////////////

// The local strategy for passport
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},(username, password, done) => {
    console.log('Local strategy in use' + username);
    User.findOne({ email: username }, function (err, user) { // Finds user using email
        if (err) { return done(e); } // Collects error
        if (!user) { // If no user found. Return that user is unauthorized. 
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        if (!user.validPassword(password)) { // Check if password is valid with function from user model. 
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        console.log(username + ' is authorized'); // logs to server if user is authorized
        return done(null, user); // returns user
    });
}));

// Serial user for the cookie sent to client. 
passport.serializeUser((user, done) => {
   done(null, user);
});

// Deserialize the users cookie. 
passport.deserializeUser(function(user, done) {
    User.findById(user._id, function(err, user) {
        done(err, user);
    });
});

// Note routes
////////////////////////////////////////////////
app.get('/notes/:id', (req, res) => { // takes parameter _ID to get users note.
    if(!req.isAuthenticated()) { // Passport check if authorized.
        return res.status(401).send('Unauthorized request');
    }

    var id = req.params.id;

    Note.find({'author': id}).then((notes) => { // Find notes with authors ID. 
        res.send({ notes });
    }, (e) => {
        res.status(400).send(e); // Collects error
    });
});

app.post('/notes', (req, res) => { // Post new note. 
    if(!req.isAuthenticated()) { // Passport check if authenticated. 
        return res.status(401).send('Unauthorized request');
    }

    var note = new Note({ // Create new note with provided author. 
        author: req.body.author,
    });

    note.save().then((doc) => { // Saves the note to database
        res.send(doc); // Sends back the created note. 
    }, (e) => {
        res.status(400).send(e); // Collects error
    });
});

app.patch('/note/', (req, res) => { // Updates the note. Takes param 
    if(!req.isAuthenticated() || req.user._id != req.body.author) { // Checks if autenticated. And curretnUser is author to the note. 
        return res.status(401).send('Unauthorized request');
    }

    var note = req.body;
    Note.findByIdAndUpdate(note._id, { $set: { title: note.title, createdOn: new Date(), text: note.text}},(err, foundNote) => {
        if(err) {
            res.send(e); // Collects error
        }
        res.send(foundNote);// Returns the updated note. 
    });
});

app.delete('/note/:id', (req, res) => { // Delete note. Takes params of note to be deleted. 
    if(!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized request'); // Check is user is authorized
    }

    var id = req.params.id;

    Note.findByIdAndRemove(id, (err, foundNote) => {
        
        if(req.user._id != foundNote.author) {
            return res.status(401).send('Unauthorized request'); // Check if notes author is not matching user. Return 401. 
        }

        if (err) {
            res.send(e); // Collects error. 
        }
        res.send(foundNote);
    });
});

// User routes
////////////////////////////////////////////////
app.post('/register', (req, res) => { // Register new user. Takes user in body. 
    var user = new User(req.body); 

    User.find({ $or: [ { username: user.username }, { email: user.email } ] }, (e, existingUser) => { // FCheck if user already exist. 
        if (existingUser.length === 0) { // If no user found
            user.save().then((doc) => { // Save and return user. 
                res.json(doc);
            }, (e) => {
                res.status(400).send(e); // Send back error.
            });
        } else {
            res.json(null); // If user found return null
        }
    });
});

app.post('/login', passport.authenticate("local"), (req, res) => { // Login usin passport local strategy. 
    var user = req.body;
    User.findOne({email: user.email}, (e, foundUser) => { // return user. 
        res.json(foundUser);
    });

});

app.patch('/updateUser', (req, res) => { // Update current user. Takes user in req. 
    if(!req.isAuthenticated() || req.user._id != req.body._id) {
        return res.status(401).send('Unauthorized request'); // Check if user is authorized usin passport. And if user is trying to update someone elses information. 
    }

    var user = req.body;
    User.findById(user._id, (e, foundUser) => { // Find user
        if (e) {
            return res.send(e); // Return eventual error 
        }
        foundUser.update(user, (e, count) => { // Update found user. 
            if (e) {
                return res.send(e); // Return if error exists. 
            }
        });
    });
    res.send('1');    // return flag if everything is okey. 
});

app.get('/loggedin', (req, res) => {
    res.send(req.isAuthenticated() ? req.user : '0'); // Check if user is logged in using passport. If note return flag = 0.
});

app.get('/logout', function(req, res){ // logout user and return them to startpage. 
    req.logout();
    res.redirect('/');
});


// serve index.html everytime
app.get('*', (req, res) => {
    res.sendfile('./public/views/index.html');
});


app.listen(port, () => {
    console.log(`started on port: ${port}`);
});