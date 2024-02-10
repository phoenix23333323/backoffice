const supabase = require('../db');

// Récupération de tous les entreprises
exports.getAll = (req, res, next) => {
    supabase
    .from('company')
    .select('*')
    .then(
        (data) => {
            res.status(200).json({
                message: 'Entreprises récupérées'
            })
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    );
}