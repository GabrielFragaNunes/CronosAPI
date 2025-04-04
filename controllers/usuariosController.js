const db = require('../config/db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.getAllUsuarios = async (req, res, next) => {
  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios');
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

exports.createUsuario = [


  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nome, senha } = req.body;
      
      // Verifica se usuário existe
      const [user] = await db.query('SELECT idUser FROM usuarios WHERE nome = ?', [nome]);
      if (user.length > 0) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      // Criptografa senha
      const hashedPassword = await bcrypt.hash(senha, 10);
      
      // Cria usuário
      const [result] = await db.query(
        'INSERT INTO usuarios (nome, senha) VALUES (?, ?)',
        [nome, hashedPassword]
      );

      res.status(201).json({ 
        id: result.insertId,
        nome,
        message: 'Usuário criado com sucesso' 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];