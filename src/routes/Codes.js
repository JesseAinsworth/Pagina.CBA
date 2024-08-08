const express = require('express');
const router = express.Router();
const Code = require('../BD/models/Code');

// Obtener todos los códigos
router.get('/', async (req, res) => {
  try {
    const codes = await Code.find();
    res.json(codes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo código
router.post('/', async (req, res) => {
  const code = new Code({
    code: req.body.code,
    description: req.body.description
  });
  try {
    const newCode = await code.save();
    res.status(201).json(newCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
