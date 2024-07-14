
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Client } = require('pg');
const {DB_URI} = require('../utils/constants');

// Connect to database
const client = new Client(
  {
    connectionString: DB_URI,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }    
  },
  console.log(`Connected to CMS Tracker Database`)
)

client.connect();

module.exports = client;