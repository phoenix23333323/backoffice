const dotenv = require('dotenv');
dotenv.config();

// Créer un client supabase pour la connexion à la BDD
const { createClient } = require('@supabase/supabase-js');

const options = {
    db: {
        schema: process.env.DB_SCHEMA,
    },
    // auth: {
    //     autoRefreshToken: true,
    //     persistSession: true,
    //     detectSessionInUrl: true
    // },
    // global: {
    //     headers: { 'x-my-custom-header': 'my-app-name' },
    // },
}

const supabase = createClient(
    process.env.DB_URL,
    process.env.DB_API_KEY,
    options
);

module.exports = supabase;