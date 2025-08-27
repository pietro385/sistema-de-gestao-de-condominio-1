const express = require('express');
const cors = require('cors');
const path = require('path');

const blocos = require('./routes/blocos');
const apartamentos = require('./routes/apartamentos');
const moradores = require('./routes/moradores');
const pagamentos = require('./routes/pagamentos');
const tiposManut = require('./routes/tipos_manutencao');
const manutencoes = require('./routes/manutencoes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/blocos', blocos);
app.use('/api/apartamentos', apartamentos);
app.use('/api/moradores', moradores);
app.use('/api/pagamentos', pagamentos);
app.use('/api/tipos_manutencao', tiposManut);
app.use('/api/manutencoes', manutencoes);

// Servir front-end
app.use('/', express.static(path.join(__dirname, '../frontend/html')));
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
