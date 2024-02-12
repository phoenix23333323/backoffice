const supabase = require('../db');

// Récupération de tous les entreprises
exports.getById = (req, res, next) => {
    supabase.from('company').select('*').eq('id',req.params.id)
    .then((company) => {
        return res.status(200).json(company.data)
    })
    .catch((err) => {return res.status(400).json({error: 'Problème select company'})});
}