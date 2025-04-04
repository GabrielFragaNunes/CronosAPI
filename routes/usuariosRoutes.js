const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rota GET /filmes (não /filmes/filmes)
router.get('/', usuariosController.getAllUsuarios);

// Outras rotas...
router.post('/', usuariosController.createUsuario);

module.exports = router;