const express = require('express');

const app = express();

// Définition des routes
// ==========>>>>>>>>>>>

// CORS
app.use((req, res, next) => {
    // Accès depuis n'importe quelle origine.
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter les headers mentionnés aux requêtes envoyées vers notre API.
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer des requêtes avec les méthodes mentionnées.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !'});
})

// Utilisation des routes
// ==========>>>>>>>>>>>

module.exports = app;