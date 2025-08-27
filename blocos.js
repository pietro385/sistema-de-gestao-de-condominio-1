const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM bloco');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { descricao, qtd_apartamentos } = req.body;
  // valida duplicidade
  const [exist] = await db.query(
    'SELECT COUNT(*) as c FROM bloco WHERE descricao = ?',
    [descricao]
  );
  if (exist[0].c) return res.status(409).json({ error: 'Bloco já cadastrado' });

  await db.query(
    'INSERT INTO bloco (descricao, qtd_apartamentos) VALUES (?, ?)',
    [descricao, qtd_apartamentos]
  );
  res.status(201).json({ message: 'Bloco cadastrado com sucesso' });
});

router.put('/:id', async (req, res) => {
  const { descricao, qtd_apartamentos } = req.body;
  const { id } = req.params;
  await db.query(
    'UPDATE bloco SET descricao = ?, qtd_apartamentos = ? WHERE id = ?',
    [descricao, qtd_apartamentos, id]
  );
  res.json({ message: 'Bloco atualizado com sucesso' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM bloco WHERE id = ?', [id]);
  res.json({ message: 'Bloco excluído com sucesso' });
});

module.exports = router;
