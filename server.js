require('dotenv').config();
const path = require('path');
const pgClient = require('./db/connection');
const { APP_HOST, PORT } = require('./utils/constants');
const express = require('express');
const { departments, roles, employees } = require("./controllers");
const startQuestions = require('./questions');

//Creation of Express app.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", departments);
app.use("/", roles);
app.use("/", employees);

//Start of questions.
startQuestions();

//Server started listening on port 3000.
app.listen(PORT, () =>
  console.log(`Server is running on http://${APP_HOST}:${PORT}`)
);
