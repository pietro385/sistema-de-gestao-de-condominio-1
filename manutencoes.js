const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query(`
    SELECT m.id, t.descricao AS tipo, m.data, m.local
    FROM manutencao m
    JOIN tipo_manutencao t ON m.tipo_id = t.id
  `);
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { tipo_id, data, local } = req.body;
  if (!tipo_id || !data || !local) return res.status(400).json({ error: 'Dados obrigatórios não informados' });
  await db.query('INSERT INTO manutencao (tipo_id, data, local) VALUES (?, ?, ?)', [tipo_id, data, local]);
  res.status(201).json({ message: 'Manutenção registrada com sucesso' });
});

module.exports = router;
