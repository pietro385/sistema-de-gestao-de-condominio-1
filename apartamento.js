const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query(`
    SELECT a.id, a.numero, a.qtd_vagas, b.descricao AS bloco
    FROM apartamento a
    JOIN bloco b ON a.bloco_id = b.id
  `);
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { bloco_id, numero, qtd_vagas } = req.body;
  // valida duplicidade
  const [exist] = await db.query(
    'SELECT COUNT(*) as c FROM apartamento WHERE bloco_id = ? AND numero = ?',
    [bloco_id, numero]
  );
  if (exist[0].c) return res.status(409).json({ error: 'Apartamento já cadastrado' });

  await db.query(
    'INSERT INTO apartamento (bloco_id, numero, qtd_vagas) VALUES (?, ?, ?)',
    [bloco_id, numero, qtd_vagas]
  );
  res.status(201).json({ message: 'Apartamento cadastrado com sucesso' });
});

router.put('/:id', async (req, res) => {
  const { bloco_id, numero, qtd_vagas } = req.body;
  const { id } = req.params;
  await db.query(
    'UPDATE apartamento SET bloco_id = ?, numero = ?, qtd_vagas = ? WHERE id = ?',
    [bloco_id, numero, qtd_vagas, id]
  );
  res.json({ message: 'Apartamento atualizado com sucesso' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM apartamento WHERE id = ?', [id]);
  res.json({ message: 'Apartamento excluído com sucesso' });
});

module.exports = router;
