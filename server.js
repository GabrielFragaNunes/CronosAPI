const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importar rotas CORRETAMENTE
const filmesRouter = require('./routes/filmesRoutes');
const usuariosRouter = require('./routes/usuariosRoutes');
const seriesRouter = require('./routes/seriesRoutes');
const timelineRouter = require('./routes/timelineRoutes');

const app = express();

// Middlewares
app.use(bodyParser.json());

// Use os routers CORRETAMENTE
app.use('/filmes', filmesRouter);
app.use('/usuarios', usuariosRouter);
app.use('/series', seriesRouter);
app.use('/timeline', timelineRouter);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API Cronos Online');
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro no servidor!');
});

app.listen(3000, '0.0.0.0', () => { // Escuta em todos os IPs
  console.log('Servidor rodando em http://localhost:3000 e no IP local');
});
