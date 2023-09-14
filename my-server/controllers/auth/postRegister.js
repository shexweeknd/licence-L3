// const User = require("../../models/user.js");
const { response } = require("express");
const { registerUser } = require("../../models/userSqlite.js");
const { getUser } = require("../../models/userSqlite.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
    const { username, email, password } = await req.body;

    //check if user exists
    await getUser({ email: email.toLowerCase() }).then(async (response) => {
        if(!!response) {
            return res.status(409).send("Email déjà utilisé.")
        } else {
            //hash du mot de passe
            const hashedPassword = await bcrypt.hash(password, 10)

            //creation de l'utilisateur dans la BDD
            await registerUser({
                email: email.toLowerCase(),
                username: username,
                password: hashedPassword
            })
            return res.status(201).send("Compte créé avec succès !")
        }
        
    }).catch(err => {
        return res.status(500).send('Une erreur s\'est produite. Veuiller Réessayer !')
    })
};

module.exports = postRegister