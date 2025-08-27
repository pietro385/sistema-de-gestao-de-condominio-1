const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/referencias', async (req, res) => {
  const [rows] = await db.query('SELECT id, mes, ano FROM referencia');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { apartamento_id, referencia_id, data_pagamento } = req.body;
  // valida existência
  const [apt] = await db.query('SELECT COUNT(*) as c FROM apartamento WHERE id = ?', [apartamento_id]);
  if (!apt[0].c) return res.status(404).json({ error: 'Apartamento não cadastrado' });

  await db.query(
    'INSERT INTO pagamento (apartamento_id, referencia_id, data_pagamento) VALUES (?, ?, ?)',
    [apartamento_id, referencia_id, data_pagamento]
  );
  res.status(201).json({ message: 'Pagamento registrado com sucesso' });
});

module.exports = router;
