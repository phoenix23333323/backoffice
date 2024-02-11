const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId;

        if(req.body.userId && req.body.userId !== userId) {
            return res.status(401).json({error:'Utilisteur non autorisé'});
        } else {
            next();
        }
    } catch {
        return res.status(401).json({error:'Erreur d\'authentification'});
    }
};