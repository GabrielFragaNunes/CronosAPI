const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',      // Ou 127.0.0.1
  user: 'root',           // Usuário padrão do XAMPP
  password: '',           // Senha vazia
  database: 'cronos',     // Nome do seu banco
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;