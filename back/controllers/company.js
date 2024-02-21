const supabase = require('../db');

exports.getCompany = (req, res, next) => {
    supabase.from('company').select('*').eq('id',req.params.id)
    .then((company) => {
        return res.status(200).json({ message: 'L\'entreprise à bien été récupérée', company: company.data } )
    })
    .catch((err) => {return res.status(400).json({error: 'Problème select company'})});
}

exports.updateCompany = (req, res, next) => {
    supabase.from('company').update( req.body ).eq('id',req.params.id).select()
    .then((company) => {
        return res.status(200).json({ message: 'L\'entreprise à bien été mise à jour', company: company.data } )
    })
    .catch((err) => {return res.status(400).json({error: 'Problème update company'})});
}