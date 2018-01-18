
// Config files
require('./config/config');

// modules =================================================
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

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'ZsssCrHDg2qKZdENtrBbMao7'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());



// Passport configuration
////////////////////////////////////
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},(username, password, done) => {
    console.log('Local strategy in use' + username);
    User.findOne({ email: username }, function (err, user) {
        if (err) { return done(e); }
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        console.log(username + ' is authorized');
        return done(null, user);
    });
}));


passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser(function(user, done) {
    User.findById(user._id, function(err, user) {
        done(err, user);
    });
});

// Note routes
////////////////////////////////////////////////
app.get('/notes/:id', (req, res) => {
    if(!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized request');
    }

    var id = req.params.id;

    Note.find({'author': id}).then((notes) => {
        res.send({ notes });
    }, (e) => {
        res.status(400).send(e);
    });
    

});


app.get('/note/:id', (req, res) => {
    if(!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized request');
    }

    var id = req.params.id;

    Note.findById().then((notes) => {
        res.send({ notes });
    }, (e) => {
        res.status(400).send(e);
    });
});


app.post('/notes', (req, res) => {
    if(!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized request');
    }

    var note = new Note({
        author: req.body.author,
    });

    note.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.patch('/note/:id', (req, res) => {
    if(!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized request');
    }
    if (req.user._id != req.body.author) {
        return res.status(401).send('Unauthorized request');
    }
    var note = req.body;

    Note.findByIdAndUpdate(note._id, { $set: { title: note.title, createdOn: new Date(), text: note.text}},(err, foundNote) => {
        if(err) {
            res.send(e);
        }
        res.send(foundNote);
    });
});

app.delete('/note/:id', (req, res) => {
    if(!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized request');
    }

    var id = req.params.id;

    Note.findByIdAndRemove(id, (err, foundNote) => {
        if (err) {
            res.send(e);
        }
        res.send(foundNote);
    });
});

// User routes
////////////////////////////////////////////////
app.post('/register', (req, res) => {
    var user = new User(req.body);

    User.find({ $or: [ { username: user.username }, { email: user.email } ] }, (e, existingUser) => {
        if (existingUser.length === 0) {
            user.save().then((doc) => {
                res.json(doc);
            }, (e) => {
                res.status(400).send(e);
            });
        } else {
            res.json(null);
        }
    });
    
});

app.post('/login', passport.authenticate("local"), (req, res) => {
    var user = req.body;
    User.findOne({email: user.email}, (e, foundUser) => {
        res.json(foundUser);
    });

});

app.patch('/updateUser', (req, res) => {
    if(!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized request');
    }

    var user = req.body;
    User.findById(user._id, (e, foundUser) => {
        if (e) {
            return res.send(e);
        }
        foundUser.update(user, (e, count) => {
            if (e) {
                return res.send(e);
            }
        });
    });
    res.send('1');    
});

app.get('/loggedin', (req, res) => {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.get('/logout', function(req, res){
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