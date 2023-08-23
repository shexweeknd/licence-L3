//permet à une caméra d'intégrer la liste des caméras connectés
require("dotenv").config();

const jwt = require("jsonwebtoken");

const camsKey = process.env.CAMS_KEY

const integrate = async (req, res) => {
    const { salle, ip, src, type, key } = req.body

    if (key ===  camsKey) {

        //creation du JWT token
        const token = jwt.sign(
            {
                salle,
                ip,
                src,
                type
            },
            process.env.JWT_KEY,
            {
              expiresIn: "24h",
            }
        );

        return res.status(202).json({
            camsDetails: {
                salle: salle,
                token: token,
            }
        })
    }

    res.send("impossible d'authentifier la caméra")
}

module.exports = integrate