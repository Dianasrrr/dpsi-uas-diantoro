require('dotenv').config();
const express = require('express');
const router = require('./routes/routing');

const app = express();
app.use(express.json());

app.use('/api', router);

module.exports = app;
