const supabase = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Création d'un user
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = {
            company_id: 1,
            email: req.body.email,
            password: hash,
            first_name: 'Fiona',
            last_name: 'POTTER'
        }
        supabase.from('users').insert(user)
        .then(() => {
            res.status(201).json({
                message: 'Utilisateur crée'
            })
        })
        .catch(error => {res.status(400).json({error: error})});
    })
    .catch(error => {res.status(500).json({error: error})});
}

// Connexion d'un user
exports.signin = (req, res, next) => {
    supabase.from('users').select('*').eq('email', req.body.email)
    .then(user => {
        if(user.data.length == 0) {
            return res.status(401).json({error:'Utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, user.data[0].password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({error:'Mot de passe incorrect'});
            }
            res.status(200).json({
                userId: user.data[0].id,
                token: jwt.sign(
                    {userId: user.data[0].id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error => {res.status(500).json({error: error})});
    })
    .catch(error => {res.status(500).json({error: error})});
}