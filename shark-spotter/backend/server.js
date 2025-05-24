// server.js (Back-End)
require('./db_connect');  // Ensure this is required first to load the dotenv and MongoDB connection
const express = require('express');
const cors = require('cors');
const { connect, insert, retrieveList, update } = require('./operations');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

connect().then((dbConnection) => {
  db = dbConnection;
}).catch((error) => {
  console.error('ERROR connecting to MongoDB:', error);
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});