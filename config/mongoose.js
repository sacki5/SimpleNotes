const mongoose = require('mongoose');

// Handles the connection to mongoDB. 
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
});

module.exports = { mongoose };