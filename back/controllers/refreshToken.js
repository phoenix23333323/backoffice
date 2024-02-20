const supabase = require('../db');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

exports.refreshedToken = (req, res, next) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res.status(401).json({ error: 'Aucun refreshToken' })
	}
	
	supabase.from('users').select('id').eq('refresh_token', refreshToken)
	.then(() => {
		jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
			if(err) {
				return res.status(401).json({ error: 'refreshToken invalide' })
			}
			delete user.iat
			delete user.exp

			supabase.from('users').select('company_id').eq('id', user.userId)
			.then((data) => {
				return res.status(200).json({
					companyId: data.data[0].company_id,
					admin: user.admin,
					userId: user.userId,
					token: jwt.sign(
							{userId: user.userId, admin: user.admin},
							process.env.SECRET_TOKEN,
							{expiresIn: '1h'}
					)
				});
			})
		})
	})
	.catch((err) => {return res.status(404).json({error: 'Aucun refreshToken valide trouvé'})});
}