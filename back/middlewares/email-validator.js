const validator = require('validator');

// Validation du format de l'email
module.exports = (req, res, next) => {
	const email = req.body.email;
	if (validator.isEmail(email) === true) {
		next();
	} else {
		return res.status(400).json({ error: 'Le format de l\'email est invalide' })
	}
}