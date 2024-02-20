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
            const refreshToken = jwt.sign(
                { userId: user.data[0].id, admin: user.data[0].admin},
                process.env.REFRESH_SECRET_TOKEN,
                { expiresIn: '24h' }
            )
            supabase.from('users').update({ refresh_token: refreshToken }).eq('id', user.data[0].id)
            .then(() => {
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                })
                return res.status(200).json({
                    admin: user.data[0].admin,
                    userId: user.data[0].id,
                    companyId: user.data[0].company_id,
                    token: jwt.sign(
                        {userId: user.data[0].id, admin: user.data[0].admin},
                        process.env.SECRET_TOKEN,
                        {expiresIn: '1h'}
                    )
                });
            })
            .catch((err) => {return res.status(400).json({error: 'Problème update refresh token users !'})});
        })
        .catch((err) => {return res.status(500).json({error: 'Problème bcrypt password !'})});
    })
    .catch((err) => {return res.status(500).json({error: 'Problème select users !'})});
}

exports.logout = (req, res, next) => {
	const cookies = req.cookies;

	if (!cookies?.refreshToken) {
		return res.status(204).json({ error: 'Pas de cookies' })
  }

  supabase.from('users').update({ refresh_token: null }).eq('refresh_token', cookies.refreshToken)
  .then(() => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      samesite: 'None',
      secure: true,
    })
    return res.status(204).json({ message: 'Cookie supprimé' })
  })
  .catch((err) => {return res.status(400).json({error: 'Problème update refresh token users !'})});
}

// Récupération des users
exports.getUsers = (req, res, next) => {
    supabase.from('users').select('*')
    .then((users) => {
        return res.status(200).json({ users: users.data });
    })
    .catch((err) => {return res.status(500).json({error: 'Problème select users !'})});
}