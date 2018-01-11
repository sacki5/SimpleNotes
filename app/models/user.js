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

// UserSchema.methods.toJSON = function () {
//     var user = this;
//     var userObject = user.toObject();
//     return _.pick(userObject, ['_id', 'username', 'email']);
// };

// UserSchema.pre('update', function(next) {
//     var user = this;
//     console.log(user._update.$set.password);
//     console.log('pre update');
    
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(user._update.$set.password, salt, (err, hash) => {
//             user._update.$set.password = hash;
//             console.log(hash);
//             next();
//           });
//         });
      
// });

// UserSchema.pre('save', function(next) {
//     var user = this;
//     console.log('pre save');
//     if (user.isModified('password')) {
//         console.log('is modified');
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(user.password, salt, (err, hash) => {
//             user.password = hash;
//             next();
//           });
//         });
//       } else {
//         next();
//       }
// });

 const User = mongoose.model('Users', UserSchema);

 module.exports = { User };