// Imports
const express = require('express');
const cookieParser = require('cookie-parser')
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
const refreshCtrl = require('./controllers/refreshToken');

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

// Cookie parser pour lire le refreshToken du httpOnlyCookie et express
app.use(cookieParser());

// Utilisation des routes
app.get('/refreshToken', refreshCtrl.refreshedToken);
app.use('/users', usersRoutes);
app.use('/company', companyRoutes);

// Exporte l'application
module.exports = app;