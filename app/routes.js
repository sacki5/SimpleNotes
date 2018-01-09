const { Note } = require('./models/note');

module.exports = function(app) {

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
        res.send(req.body);
        
    });

    app.post('/login', (req, res) => {
        res.send('Hello from user service, login');
    });

    app.get('*', (req, res) => {
        res.sendfile('./public/views/index.html');
    });

};
