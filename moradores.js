const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query(`
    SELECT m.cpf, m.nome, m.telefone,
           a.numero AS apto, b.descricao AS bloco
    FROM morador m
    JOIN apartamento a ON m.apartamento_id = a.id
    JOIN bloco b ON a.bloco_id = b.id
  `);
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { cpf, nome, telefone, apartamento_id, tipo_responsavel, possui_veiculo, vagas_garagem } = req.body;
  // valida duplicidade
  const [exist] = await db.query('SELECT COUNT(*) as c FROM morador WHERE cpf = ?', [cpf]);
  if (exist[0].c) return res.status(409).json({ error: 'Morador já cadastrado' });

  await db.query(
    `INSERT INTO morador 
      (cpf, nome, telefone, apartamento_id, tipo_responsavel, possui_veiculo, vagas_garagem)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [cpf, nome, telefone, apartamento_id, tipo_responsavel, possui_veiculo, vagas_garagem]
  );
  res.status(201).json({ message: 'Morador cadastrado com sucesso' });
});

router.put('/:cpf', async (req, res) => {
  const { nome, telefone, apartamento_id, tipo_responsavel, possui_veiculo, vagas_garagem } = req.body;
  const { cpf } = req.params;
  await db.query(
    `UPDATE morador
     SET nome = ?, telefone = ?, apartamento_id = ?, tipo_responsavel = ?, possui_veiculo = ?, vagas_garagem = ?
     WHERE cpf = ?`,
    [nome, telefone, apartamento_id, tipo_responsavel, possui_veiculo, vagas_garagem, cpf]
  );
  res.json({ message: 'Morador atualizado com sucesso' });
});

router.delete('/:cpf', async (req, res) => {
  const { cpf } = req.params;
  await db.query('DELETE FROM morador WHERE cpf = ?', [cpf]);
  res.json({ message: 'Morador excluído com sucesso' });
});

module.exports = router;
