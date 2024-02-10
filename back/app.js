// Imports
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

// Créer une application Express
const app = express();

// Bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Créer un client supabase pour la connexion à la BDD
const supabase = createClient(
    'https://krsjgrhjzlaybybwedee.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyc2pncmhqemxheWJ5YndlZGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MTIyOTUsImV4cCI6MjAyMzA4ODI5NX0.BqVYL5l-oYAnXquedaQP2VGOPKImWMl5BbbJkXu9mIg'
);

// Définition des routes
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
app.use('/company', companyRoutes);

// Exporte l'application
module.exports = app;