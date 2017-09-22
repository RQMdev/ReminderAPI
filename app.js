const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const blacklist = require('express-jwt-blacklist');
const { JWT_SECRET } = require('./configuration');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reminderAPI');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/stickys', require('./routes/stickys'));
app.use('/users', require('./routes/users'));

// Start Server
const port = process.env.PORT || 3001;
app.listen(port);
console.log(`Server listening at ${port}`);
