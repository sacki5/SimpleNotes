const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength:6,
    },
});

// Method for getting user as JSON. 
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email', 'username']);
};

// Check if password is valid using bcrypt, 
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// When user updates information this runs before it updates. 
UserSchema.pre('update', function(next) {
    var user = this;
        if(user._update.$set.password) { // If they update the password. Generetes hashed password using bcrypt. 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user._update.$set.password, salt, (err, hash) => {
                    user._update.$set.password = hash;
                    return next();
                });
            });
        }
    next();
});

// runs before a new user is saved. 
UserSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) { // Hashes the password using bcrypt. 
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
          });
        });
      } else {
        next();
      }
});

 const User = mongoose.model('Users', UserSchema);

 module.exports = { User };