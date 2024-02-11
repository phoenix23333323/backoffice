// Imports
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

// Créer une application Express
const app = express();

// Bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Définition des routes
const usersRoutes = require('./routes/users');
const companyRoutes = require('./routes/company');

// CORS : Cross Origine Policies
app.use(
	helmet(
		{ crossOriginResourcePolicy: { policy: 'cross-origin' } },
		{ crossOriginOpenerPolicy: { policy: 'cross-origin' } }
	)
)
app.use(
	cors({
		credentials: true,
		origin: process.env.FRONT_PORT,
		optionsSuccessStatus: 200,
	})
)
// app.use((req, res, next) => {
//     // Accès depuis n'importe quelle origine
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     // Envoyer des requêtes avec les méthodes mentionnées
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

// Utilisation des routes
app.use('/users', usersRoutes);
app.use('/company', companyRoutes);

// Exporte l'application
module.exports = app;