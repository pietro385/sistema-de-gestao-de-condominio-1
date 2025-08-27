const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'SEU_USUARIO_MYSQL',
  password: 'SUA_SENHA_MYSQL',
  database: 'gestao_condominio',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
