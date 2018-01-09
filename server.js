// Config files
require('./config/config');

// modules =================================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { mongoose } = require('./config/mongoose');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static('public'));


require('./app/routes')(app);

app.listen(port, () => {
    console.log(`started on port: ${port}`);
});