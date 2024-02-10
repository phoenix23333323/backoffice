// Créer un client supabase pour la connexion à la BDD
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://krsjgrhjzlaybybwedee.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyc2pncmhqemxheWJ5YndlZGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MTIyOTUsImV4cCI6MjAyMzA4ODI5NX0.BqVYL5l-oYAnXquedaQP2VGOPKImWMl5BbbJkXu9mIg'
);

module.exports = supabase;