const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const socket = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/bundle', express.static(path.join(__dirname, '../bundle')));


app.listen(PORT, () => (console.log('we are listening on port', PORT)) );