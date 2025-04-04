const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');

// Rota GET /filmes (não /filmes/filmes)
router.get('/', filmesController.getAllFilmes);

// Outras rotas...
router.post('/', filmesController.createFilme);

module.exports = router;