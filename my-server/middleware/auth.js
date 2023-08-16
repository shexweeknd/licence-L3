//middleware custom
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization']

    console.log("the token is : " + token)

    if (!token) {
        return res.status(403).send("Un jeton est nécessaire pour cette connexion.")
    }

    try {

        token = token.replace(/^Bearer\s+/, "");
        const decoded = jwt.verify(token, config.JWT_KEY);
        req.user = decoded;

    } catch (err) {
        return res.status(401).send('Jeton invalide')
    }

    return next();
}

module.exports = verifyToken;