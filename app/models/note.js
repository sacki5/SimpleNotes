const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength:1,
        trim: true,
        default: 'No title',
    },
    text: {
        type: String,
        trim: true,
    },
    author: {
        type: Number,
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
});
const Note = mongoose.model('Notes', NoteSchema);

module.exports = { Note };