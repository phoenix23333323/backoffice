// Récupération de tous les entreprises
exports.getAll = (req, res, next) => {
    supabase
    .from('company')
    .select('*')
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}