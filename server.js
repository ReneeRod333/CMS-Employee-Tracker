require('dotenv').config();
const path = require('path');
const pgClient = require('./db/connection');
const { APP_HOST, PORT } = require('./utils/constants');
const express = require('express');
const startQuestions = require('./questions');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

startQuestions();

app.listen(PORT, () =>
    console.log(`Server is running on http://${APP_HOST}:${PORT}`)
  );
