require('dotenv').config();
const path = require('path');
const sequelize = require('./db/connection');
// const { APP_HOST, PORT } = require('./utils/constants');

sequelize.sync({ force: false });