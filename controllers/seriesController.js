const db = require('../config/db');

// Exporta séries
exports.getAllSeries = async (req, res, next) =>{
    try{
        const [series] = await db.query('SELECT * FROM series');
        res.json(series);
    } catch (error){
        next(error);
    }
};