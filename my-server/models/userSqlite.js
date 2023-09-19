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

  const registerUser = async ({ username, email, password }) => {
    
      return new Promise((resolve, reject) => {
        db.run('INSERT INTO pending (username, email, password) VALUES (?, ?, ?)', [username, email, password], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    };

const setLog = async ({email, date}) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE user SET connected = ? WHERE email = ?', [date, email], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve('Utilisateur: ', this.lastID, " journalisé avec succès");
      }
    });
  });
}

const getAll = async () => {

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pending', function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

const queryUsers = async () => {

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM user WHERE email != "admin@eye.com"', function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

const approve = async ({email}) => {
  return new Promise((resolve, reject) => {

    db.get("SELECT * FROM pending WHERE email = ?", [email], function (err,row) {
      if (err) {
        reject(err);
      } else {
        console.log(row)

        const username = row.username;
        const email = row.email;
        const password = row.password;

        const id = uuidv4();

        db.run("INSERT INTO user (username, email, password, _id) VALUES (?, ?, ?, ?)", [username, email, password, id], async function (err) {
          if (err) {
            reject(err);
          } else {
            await deny({email});
            resolve(this.lastID, " was approved and can now connect to the server.")
          }
        })
      }
    })
  })
}

const deny = async ({email}) => {
 return new Promise((resolve, reject) => {
  
  db.run("DELETE FROM pending WHERE email = ?", [email], function (err) {
    if (err) {
      reject(err);
    } else {
      resolve(this.lastID, " was removed from pendings.")
    }
  })
 })
}

const deleteUser = async ({email}) => {
  return new Promise((resolve, reject) => {
   
   db.run("DELETE FROM user WHERE email = ?", [email], function (err) {
     if (err) {
       reject(err);
     } else {
       resolve(this.lastID, " was removed from users.")
     }
   })
  })
 }

module.exports = {getUser, queryUsers, registerUser, setLog, getAll, approve, deny, deleteUser}