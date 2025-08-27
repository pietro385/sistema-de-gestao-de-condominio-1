const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM tipo_manutencao');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { descricao } = req.body;
  const [exist] = await db.query('SELECT COUNT(*) as c FROM tipo_manutencao WHERE descricao = ?', [descricao]);
  if (exist[0].c) return res.status(409).json({ error: 'Tipo já cadastrado' });

  await db.query('INSERT INTO tipo_manutencao (descricao) VALUES (?)', [descricao]);
  res.status(201).json({ message: 'Tipo de manutenção cadastrado com sucesso' });
});

module.exports = router;
