//middleware custom for admin Authentification
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization']

    if (!token) {
        return res.status(403).send("Un jeton admin est nécessaire pour cette connexion.")
    }

    try {

        token = token.replace(/^Bearer\s+/, "");
        const decoded = jwt.verify(token, config.JWT_KEY);
        req.user = decoded;

        if(req.user.email != "admin@eye.com") {
            return res.status(401).send('Jeton admin invalide')
        }

    } catch (err) {
        return res.status(401).send('Jeton admin invalide')
    }

    return next();
}

module.exports = verifyToken;