const supabase = require('../db');

// Récupération de tous les entreprises
exports.getAll = (req, res, next) => {
    supabase.from('company').select('*')
    .then((companys) => {
        return res.status(200).json({message: 'Entreprises récupérées'})
    })
    .catch((err) => {return res.status(400).json({error: 'Problème select company'})});
}