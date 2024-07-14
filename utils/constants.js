const PORT = process.env.PORT || 3001;
const APP_HOST = process.env.APP_HOST || 'localhost';
const DB_URI = process.env.DB_URI;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = { PORT, APP_HOST, DB_URI, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT };