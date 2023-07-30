const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('chemin/vers/ma-base-de-donnees.db', (err) => {
    if (err) {
      console.error('Erreur lors de la connexion à la base de données : ', err.message);
    } else {
      console.log('Connexion à la base de données réussie.');
    }
  });

const queryFromBD = async (query, db) => {
    await db.all(`${query}`, (err, rows) => {
        if (err) {
            console.error('Erreur lors de la récupération des données : ', err.message);
            return err.message
        } else {
            console.log('Résultat de la requête : ', rows);
            return rows
            // à modifier stockage dans un objet/array
        }
        });
    }

    db.close((err) => {
        if (err) {
            console.error('Erreur lors de la fermeture de la connexion à la base de données : ', err.message);
            return err.message
        } else {
            return ('Connexion à la base de données fermée.');
        }
    });
    
module.exports = queryFromBD