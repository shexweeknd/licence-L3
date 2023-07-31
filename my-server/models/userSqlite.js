const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const db = require('../db.js');

const getUser = async ({email}) => {
    return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user WHERE email = ? ";

    db.get(query, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };

    //  db.close((err) => {
    //      if (err) {
    //          console.error('Erreur lors de la fermeture de la connexion à la base de données : ', err.message);
    //          return err.message
    //      } else {
    //          return ('Connexion à la base de données fermée.');
    //      }
    //  });

    const addUser = async ({ username, email, password }) => {
        const id = uuidv4();
      
        return new Promise((resolve, reject) => {
          db.run('INSERT INTO user (username, email, password, _id) VALUES (?, ?, ?, ?)', [username, email, password, id], function (err) {
            if (err) {
              reject(err);
            } else {
              console.log('Nouvel utilisateur ajouté avec l\'ID:', this.lastID);
              resolve(id); // Renvoie l'id de l'utilisateur ajouté
            }
          });
        });
      };

module.exports = {getUser, addUser}