const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllFilmes = async (req, res) => {
  try {
    const [filmes] = await db.query(`
        SELECT 
            idFilme as id,
            nomeFilme as titulo,
            imagem_filme,
            faseFilme as fase,
            duracaoFilme as duracao,
            dataFilme as dataLancamento,
            descricaoFilme as descricao
        FROM filmes 
        ORDER BY dataFilme
    `);
    
    const filmesFormatados = await Promise.all(filmes.map(async (filme, index) => {
        let imagemBase64 = null;
        
        // Verifica se a imagem é um caminho de arquivo
        if (filme.imagem_filme && typeof filme.imagem_filme === 'string') {
            try {
                // Remove qualquer prefixo de caminho existente
                const filename = filme.imagem_filme.split(/[\\/]/).pop();
                const imagePath = path.join(__dirname, '..', 'uploads', filename);
                
                console.log('Procurando imagem em:', imagePath);
                
                if (fs.existsSync(imagePath)) {
                    const imageBuffer = fs.readFileSync(imagePath);
                    const ext = path.extname(imagePath).toLowerCase();
                    
                    // Determina o tipo MIME
                    let mimeType = 'image/jpeg'; // padrão para .jpg, .jpeg, .jfif
                    if (ext === '.png') mimeType = 'image/png';
                    if (ext === '.gif') mimeType = 'image/gif';
                    
                    imagemBase64 = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
                } else {
                    console.warn('Arquivo não encontrado:', imagePath);
                }
            } catch (err) {
                console.error('Erro ao processar imagem:', err);
            }
        }
        // Se a imagem já estiver em formato Base64
        else if (filme.imagem_filme && filme.imagem_filme.startsWith('data:image/')) {
            imagemBase64 = filme.imagem_filme;
        }

        return {
            id: filme.id,
            titulo: filme.titulo,
            descricao: filme.descricao,
            imagem: imagemBase64,
            fase: filme.fase,
            duracao: filme.duracao,
            position: index % 2 === 0 ? 'left' : 'right',
            dataLancamento: filme.dataLancamento.toISOString().split('T')[0] // Formato YYYY-MM-DD
        };
    }));

    res.json(filmesFormatados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
};

exports.createFilme = async (req, res, next) => {
  try {
    const { titulo, ano, diretor } = req.body;
    const [result] = await db.query(
      'INSERT INTO filmes (titulo, ano, diretor) VALUES (?, ?, ?)',
      [titulo, ano, diretor]
    );
    res.status(201).json({ id: result.insertId, titulo, ano, diretor });
  } catch (error) {
    next(error);
  }
};