const path = require('path');

// Jsons for Api calls
const {bosses} = require('./game/creatures/enemies/bosses');
const {minions} = require('./game/creatures/enemies/minions');
const {dungeon} = require('./game/dungeon');

// Express module
const express = require("express");
const app = express();

// Credentials for MySQL DB
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sakila'
})

// Use static folder of the angular project app
app.use(express.static(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser')));

// Api Routes
app.get('/api/minions', (req, res) => {
  res.json(minions);
});
app.get('/api/minions/:position', (req, res) => {
  const { position } = req.params;
  if(res.json(minions[position]) === undefined) {
    res.send('<h1>Resource does not exists</h1>');
  }
  else {
    res.json(minions[position]);
  }
});
app.get('/api/bosses', (req, res) => {
  res.json(bosses);
});
app.get('/api/bosses/:position', (req, res) => {
  const { position } = req.params;
  if(bosses[position] === undefined) {
    res.send('<h1>Resource does not exists</h1>');
  }
  else {
    res.json(bosses[position]);
  }
});
app.get('/api/dungeon', (req, res) => {
  res.json(dungeon);
});
app.get('/api/dungeon/:level', (req, res) => {
  const { level } = req.params;
  if(dungeon[level] === undefined) {
    res.send('<h1>Resource does not exists</h1>');
  }
  else {
    res.json(dungeon[level]);
  }
});

// All paths at Angular App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser/index.html'));
});

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err
  console.log('The solution is: ', rows[0].solution)
})

connection.end()

// Server's App is listening on port 3000
app.listen(3000, () => {
  console.log("Server is up");
});