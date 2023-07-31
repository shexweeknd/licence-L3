const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./data.sqlite", (err) => {
  if (err) {
    return console.error("Erreur lors de la connexion à la base de données :", err.message);
  }
  console.log("Connecté à la base de données SQLite3.");
});

module.exports = db;
