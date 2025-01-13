const express = require('express');
const router = express.Router();

// Import resources
const { minions } = require('../game/creatures/enemies/minions');
const { bosses } = require('../game/creatures/enemies/bosses');
const dungeon = require('../game/dungeon');

// Minions API
router.get('/minions', (req, res) => {
  res.json(minions);
});

router.get('/minions/:position', (req, res) => {
  const { position } = req.params;
  if (!minions[position]) {
    return res.status(404).json({ error: 'Resource does not exist' });
  }
  res.json(minions[position]);
});

// Bosses API
router.get('/bosses', (req, res) => {
  res.json(bosses);
});

router.get('/bosses/:position', (req, res) => {
  const { position } = req.params;
  if (!bosses[position]) {
    return res.status(404).json({ error: 'Resource does not exist' });
  }
  res.json(bosses[position]);
});

// Dungeon API
router.get('/dungeon', (req, res) => {
  res.json(dungeon);
});

router.get('/dungeon/:level', (req, res) => {
  const { level } = req.params;
  if (!dungeon[level]) {
    return res.status(404).json({ error: 'Resource does not exist' });
  }
  res.json(dungeon[level]);
});

module.exports = router;