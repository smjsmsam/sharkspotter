// server.js (Back-End)
require('./db_connect');  // Ensure this is required first to load the dotenv and MongoDB connection
const express = require('express');
const cors = require('cors');
const { connect, insert, retrieveList, update, insertResources, insertCommunityReport } = require('./operations');
const { verifyUser } = require('./login');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;
let user = {'username': ''};

connect().then((dbConnection) => {
  db = dbConnection;
}).catch((error) => {
  console.error('ERROR connecting to MongoDB:', error);
});


app.get('/api/retrieveData', async (req, res) => {
  try {
    const { type } = req.query;
    const data = await retrieveList(db, type);
    console.log('RETRIEVING', type);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving list' });
  }
});

app.post('/api/insertDayData', async (req, res) => {
  console.log("HIII");
  const { date, scale, datetime } = req.body; // Could simplify and combine insertion to 1 function, but for clarity left as is
  try {
    await insertDay(db, date, scale, datetime);
    console.log('DATA INSERTED BACKEND');
    res.status(201).json({ message: 'Day data inserted!' });
  } catch (error) {
    res.status(500).json({ error: 'Error inserting day data' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


app.post('/api/verifyUser', async (req, res) => {
  console.log("/verifyUser");
  const { username, password } = req.body;
  try {
    result = await verifyUser(db, username, password);
    if (result.status == 'success') {
      user.username = result.username;
      res.status(201).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not connect to server.' });
  }
});


app.post('/api/insertUser', async (req, res) => {
  console.log("/insertUser");
  const { username, password } = req.body;
  try {
    result = await insert(db, username, password);
    if (result.status == 'success') {
      user.username = result.username;
      res.status(201).json(result);
    } else {
      errorMessage = result.err_msg;
      res.status(401).json({ error: errorMessage });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not connect to server.' });
  }
});


app.get('/api/userStatus', async (req, res) => {
  console.log("/insertUser");
  try {
    if (user.username != '') {
      const tempUser = user;
      tempUser.status = 'success';
      tempUser.message = 'Logged in.';
      res.status(201).json(tempUser);
    } else {
      const tempUser = user;
      tempUser.status = 'error';
      tempUser.message = 'Not logged in.';
      res.status(201).json(tempUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'What is going on?' });
  }
});


app.post('/api/userLogout', async (req, res) => {
  console.log("/userLogout");
  user = {'username': ''};
  res.status(201).json({'status': 'success', 'message': 'Succesfully logged out.'});
});