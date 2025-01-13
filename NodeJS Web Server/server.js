const path = require('path');
const game = require('./game/mechanics');
const os = require('os'); // Optional (is only for retrieving local ipv4 ip)

require('dotenv').config();

// Express module
const express = require("express");
const app = express();
// create server with express app and socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Modularized API routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// Use static folder of the angular project app
app.use(express.static(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser')));
app.use(express.json()); // This is important to parse incoming JSON payloads
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// All paths at Angular App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser/index.html'));
});

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

// Retrieve local ip address
const localIp = Object.values(os.networkInterfaces()).flat()
  .find(net => net.family === 'IPv4' && !net.internal)?.address || '127.0.0.1';

// Server's App is listening on port 3000 or .env PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on http://${localIp}:${PORT}`);
});