const path = require('path');
// Json files for Api calls
const {bosses} = require('./game/creatures/enemies/bosses');
const {minions} = require('./game/creatures/enemies/minions');
let boss;
// Express module
const express = require("express");
const app = express();
// Use static folder of the angular project app and get root page
app.use(express.static(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser/index.html'));
});

// Api Routes
app.get('/api/minions', (req, res) => {
  res.json(minions);
});
app.get('/api/minions/:position', (req, res) => {
  const { position } = req.params;
  res.json(minions[position]);
});
app.get('/api/bosses', (req, res) => {
  res.json(bosses);
});
app.get('/api/bosses/:position', (req, res) => {
  const { position } = req.params;
  res.json(bosses[position]);
});

// Server's App is listening on port 3000
app.listen(3000, () => {
  console.log("Server is up");
});