const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength:1,
        trim: true,
        default: 'New note',
    },
    text: {
        type: String,
        trim: true,
    },
    author: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
});
const Note = mongoose.model('Notes', NoteSchema);

module.exports = { Note };