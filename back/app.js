// Imports
const express = require('express');
const bodyParser = require('body-parser');

// Créer une application Express
const app = express();

// Bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Définition des routes
const usersRoutes = require('./routes/users');
const companyRoutes = require('./routes/company');

// CORS
app.use((req, res, next) => {
    // Accès depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Utilisation des routes
app.use('/users', usersRoutes);
app.use('/company', companyRoutes);

// Exporte l'application
module.exports = app;