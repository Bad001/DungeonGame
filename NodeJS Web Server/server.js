const path = require('path');
const game = require('./game/mechanics');
require('dotenv').config();

// Express module
const express = require("express");
const app = express();
// create server with express app and socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Credentials for MySQL DB available on environment file
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Modularized API routes
const apiRoutes = require('./routes/api');

// Use static folder of the angular project app
app.use(express.static(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser')));
app.use('/api', apiRoutes);

// All paths at Angular App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser/index.html'));
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Only for test the connection with DB
connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) {
    console.error(err);
  }
  else {
    console.log('The solution is: ', rows[0].solution);
  }
})

connection.end()

io.on('connection', (socket) => {
  console.log('Player '+socket.id+' joined a new game');
  socket.on('startGame', (role) => {
    try {
      gameObject = new game.Game(socket);
      gameObject.startGame(role).then(message => {console.log(message)}).catch(e => console.log(e));
    } catch (error) {
      console.error('Error starting game:', error);
    }
  });
  socket.on('disconnect', () => {
    console.log('Player '+socket.id+' has left the game');
  });
});

// Server's App is listening on port 3000 or .env PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});