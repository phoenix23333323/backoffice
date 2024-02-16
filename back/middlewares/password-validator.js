const passwordValidator = require('password-validator');

// Schema de validation :
const passwordSchema = new passwordValidator();
passwordSchema
	.is().min(8) // Minimum length 8
	.is().max(30) // Maximum length 30
	.has().uppercase() // Doit contenir au moins un majuscule
	.has().lowercase() // Doit contenir au moins un minuscule
	.has().digits(1) // Doit contenir au moins un chiffre
	.has().not().spaces() // Ne doit pas contenir d'espace

// Test du mot de passe saisit par l'utilisateur
module.exports = (req, res, next) => {
	if(passwordSchema.validate(req.body.password)) {
		next();
	} else {
		return res.status(400).json({
			error: "Le mot de passe n'est pas conforme, il doit contenir entre 8 et 30 caractères, au moins 1 majuscule, 1 minuscule, 1 chiffre. Les espaces sont interdits."
		})
	}
}