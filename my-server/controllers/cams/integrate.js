//permet à une caméra d'intégrer la liste des caméras connectés
require("dotenv").config();

const jwt = require("jsonwebtoken");
const serverStore = require("../../store/serverStore.js");

const camsKey = process.env.CAMS_KEY

const integrate = async (req, res) => {
    const { salle, key } = req.body

    if (key ===  camsKey) {

        //verification si caméra d'une salle pleine
        const activeCams = serverStore.getActiveCamsConnections()

        let count = 0

        activeCams.forEach(camsMap => {
            if(salle === camsMap.salle){
                count = count + 1
            }
        });

        if(count>=4){
            return res.status(400).json({
                message: "nombre de caméra pleine"
                });
        }

        //creation du JWT token
        const token = jwt.sign(
            {
                salle
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