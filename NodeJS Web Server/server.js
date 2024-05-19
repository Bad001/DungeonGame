const express = require("express");
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../DungeonGame/dist/dungeon-game/browser/index.html'));
});

app.listen(3000, () => {
    console.log("Server's up");
});