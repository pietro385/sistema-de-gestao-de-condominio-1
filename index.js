const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gestao_de_condominio'
});

connection.connect(function(err) {
    if (err) {
        console.error("Erro: ", err);
        return;
    } else {
        console.log("Conexão ok");
    }
});

app.post('/blocos', (req, res) => {
    const nome = req.body.nome;
    const quantidade = req.body.quantidade_apartamentos;
    connection.query(
        'INSERT INTO blocos (nome, quantidade_apartamentos) VALUES (?, ?)',
        [nome, quantidade],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao cadastrar bloco');
            }
            res.status(200).send('Bloco cadastrado com sucesso');
        }
    );
});

app.get('/blocos', (req, res) => {
    connection.query('SELECT id, nome, quantidade_apartamentos FROM blocos', (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar blocos' });
        res.json(results);
    });
});
app.post('/apartamentos', (req, res) => {
    const { id_bloco, numero, vagas, area } = req.body;
    connection.query(
        'INSERT INTO apartamentos (id_bloco, numero, vagas, area) VALUES (?, ?, ?, ?)',
        [id_bloco, numero, vagas, area],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao cadastrar apartamento');
            }
            res.status(200).send('Apartamento cadastrado com sucesso');
        }
    );
});

// Rota para listar apartamentos
app.get('/apartamentos', (req, res) => {
    connection.query('SELECT * FROM apartamentos', (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar apartamentos' });
        res.json(results);
    });
});

app.post('/manutencoes', (req, res) => {
    const { descricao, data, custo } = req.body;
    connection.query(
        'INSERT INTO manutencoes (descricao, data, custo) VALUES (?, ?, ?)',
        [descricao, data, custo],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao cadastrar manutenção');
            }
            res.status(200).send('Manutenção cadastrada com sucesso');
        }
    );
});

// Rota para listar manutenções
app.get('/manutencoes', (req, res) => {
    connection.query('SELECT * FROM manutencoes', (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar manutenções' });
        res.json(results);
    });
});

app.post('/moradores', (req, res) => {
    const { cpf, nome, telefone, email, id_apartamento } = req.body;
    connection.query(
        'INSERT INTO moradores (cpf, nome, telefone, email, id_apartamento) VALUES (?, ?, ?, ?, ?)',
        [cpf, nome, telefone, email, id_apartamento],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao cadastrar morador');
            }
            res.status(200).send('Morador cadastrado com sucesso');
        }
    );
});

// POST para cadastrar pagamento
app.post('/pagamentos', (req, res) => {
    const { id_morador, valor, data_pagamento, descricao } = req.body;
    connection.query(
        'INSERT INTO pagamentos (id_morador, valor, data_pagamento, descricao) VALUES (?, ?, ?, ?)',
        [id_morador, valor, data_pagamento, descricao],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao cadastrar pagamento');
            }
            res.status(200).send('Pagamento cadastrado com sucesso');
        }
    );
});