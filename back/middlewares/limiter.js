const rateLimit = require('express-rate-limit')

// rate limiter
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 5, // Limite a 5 requetes sur 5min
	message: {error: "Trop de tentatives de connexion, essayez à nouveau dans 5 min !"}
})

module.exports = { limiter }