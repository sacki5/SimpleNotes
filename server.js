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


const { mongoose } = require('./config/mongoose');
const { Note } = require('./app/models/note');
const { User} = require('./app/models/user');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());




passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username: username, password: password}, (e, user) => {
        if(e) { return done(e); }
        if(!user) { return done(null, false, { message: 'Couldnt find user'}); }
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


app.get('/notes/:id', (req, res) => {
    var id = req.params.id;

    Note.find({'author': id}).then((notes) => {
        res.send({ notes });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/note/:id', (req, res) => {
    var id = req.params.id;

    Note.findById().then((notes) => {
        res.send({ notes });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/notes', (req, res) => {
    var note = new Note({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
    });

    note.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});

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

    User.findOne({username: user.username, password: user.password}, (e, foundUser) => {
        res.json(foundUser);
    });
});

app.patch('/updateUser', (req, res) => {
    var user = req.body;

    User.findById(user._id, (e, foundUser) => {
        foundUser.update(user, (e, count) => {
            res.send(count);    
        });
    });

});

app.get('/loggedin', (req, res) => {
    console.log('loggedin calles');
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.get('*', (req, res) => {
    res.sendfile('./public/views/index.html');
});



app.listen(port, () => {
    console.log(`started on port: ${port}`);
});