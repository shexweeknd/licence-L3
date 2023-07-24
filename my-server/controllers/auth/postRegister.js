const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //check if user exists
        const userExists = await User.exists({ email: email.toLowerCase() });

        if (userExists) {
            return res.status(409).send("Email déjà utilisé.")
        }

        //hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10)

        //creation de l'utilisateur dans la BDD
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword
        })

        res.status(201).send("Compte créé avec succès !")

    } catch {
        return res.status(500).send("Une erreur s'est produite. Veuillez Réessayer")
    }
};

module.exports = postRegister