const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sistema_gerenciamento_apartamentos' // ✅ nome correto
  });
  

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Página inicial (sem consulta ao banco)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Cadastro de blocos
app.post('/blocos', (req, res) => {
  const { nome, quantidade_apartamentos } = req.body;

  if (!nome || !quantidade_apartamentos) {
    return res.status(400).send('Preencha todos os campos');
  }

  const sql = 'INSERT INTO blocos (nome, quantidade_apartamentos) VALUES (?, ?)';
  db.query(sql, [nome, quantidade_apartamentos], err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao cadastrar bloco');
    }
    res.status(200).send('Bloco cadastrado com sucesso');
  });
});

app.get('/blocos', (req, res) => {
  db.query('SELECT * FROM blocos', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar blocos' });
    res.json(results);
  });
});

// Cadastro de apartamentos
app.post('/apartamentos', (req, res) => {
  const { id_bloco, numero, vagas, area } = req.body;

  if (!id_bloco || !numero || !area) {
    return res.status(400).send('Preencha todos os campos obrigatórios');
  }

  const sql = 'INSERT INTO apartamentos (id_bloco, numero, vagas, area) VALUES (?, ?, ?, ?)';
  db.query(sql, [id_bloco, numero, vagas || 0, area], err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao cadastrar apartamento');
    }
    res.status(200).send('Apartamento cadastrado com sucesso');
  });
});

app.get('/apartamentos', (req, res) => {
  db.query('SELECT * FROM apartamentos', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar apartamentos' });
    res.json(results);
  });
});


app.post('/manutencoes', (req, res) => {
  const { descricao, data, custo } = req.body;

  if (!descricao || !data || !custo) {
    return res.status(400).send('Preencha todos os campos');
  }

  const sql = 'INSERT INTO manutencoes (descricao, data, custo) VALUES (?, ?, ?)';
  db.query(sql, [descricao, data, custo], err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao cadastrar manutenção');
    }
    res.status(200).send('Manutenção cadastrada com sucesso');
  });
});

app.get('/manutencoes', (req, res) => {
  db.query('SELECT * FROM manutencoes', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar manutenções' });
    res.json(results);
  });
});


app.post('/moradores', (req, res) => {
  const { cpf, nome, telefone, email, id_apartamento } = req.body;

  if (!cpf || !nome || !id_apartamento) {
    return res.status(400).send('Preencha os campos obrigatórios');
  }

  const sql = 'INSERT INTO moradores (cpf, nome, telefone, email, id_apartamento) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [cpf, nome, telefone || '', email || '', id_apartamento], err => {
    if (err) {
      console.error(err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('CPF já cadastrado');
      }
      return res.status(500).send('Erro ao cadastrar morador');
    }
    res.status(200).send('Morador cadastrado com sucesso');
  });
});


app.post('/pagamentos', (req, res) => {
  const { id_morador, valor, data_pagamento, descricao } = req.body;

  if (!id_morador || !valor || !data_pagamento) {
    return res.status(400).send('Preencha os campos obrigatórios');
  }

  const sql = 'INSERT INTO pagamentos (id_morador, valor, data_pagamento, descricao) VALUES (?, ?, ?, ?)';
  db.query(sql, [id_morador, valor, data_pagamento, descricao || ''], err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao cadastrar pagamento');
    }
    res.status(200).send('Pagamento cadastrado com sucesso');
  });
});

app.get('/pagamentos', (req, res) => {
  db.query('SELECT * FROM pagamentos', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar pagamentos' });
    res.json(results);
  });
});


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
