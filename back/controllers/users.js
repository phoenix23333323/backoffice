const supabase = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Création d'un user
exports.signup = (req, res, next) => {
    const salt = parseInt(process.env.SALT);
    bcrypt.genSalt(salt)
    .then((saltRes) => {
        bcrypt.hash(req.body.password, saltRes)
        .then((hash) => {
            const user = {
                company_id: 1,
                email: req.body.email,
                password: hash
            }
            supabase.from('users').insert(user)
            .then((err) => {
                if(err.error != null) {
                    if(err.error.code == 23505) {
                        return res.status(err.status).json({error: 'Email déjà utilisé !'});
                    }
                    return res.status(400).json({error: 'Création du compte impossible !'});
                }
                return res.status(201).json({message: 'Utilisateur crée !'});
            })
            .catch((err) => {return res.status(400).json({error: 'Problème insert users !'})});
        })
        .catch((err) => {return res.status(400).json({error: 'Problème lors du hasage du mot de passe !'})});
    })
    .catch((err) => {return res.status(400).json({error: 'Problème lors du saltage du mot de passe !'})});
}

// Connexion d'un user
exports.signin = (req, res, next) => {
    supabase.from('users').select('*').eq('email', req.body.email)
    .then((user) => {
        if(user.data.length == 0) {
            return res.status(401).json({error:'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.data[0].password)
        .then((valid) => {
            if(!user.data[0].actif) {
                return res.status(401).json({error:'Compte désactivé !'});
            }
            if(!valid) {
                return res.status(401).json({error:'Mot de passe incorrect !'});
            }
            return res.status(200).json({
                admin: user.data[0].admin,
                userId: user.data[0].id,
                token: jwt.sign(
                    {userId: user.data[0].id},
                    process.env.SECRET_TOKEN,
                    {expiresIn: '24h'}
                )
            });
        })
        .catch((err) => {return res.status(500).json({error: 'Problème bcrypt password !'})});
    })
    .catch((err) => {return res.status(500).json({error: 'Problème select users !'})});
}