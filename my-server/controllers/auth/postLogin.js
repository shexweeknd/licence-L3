// const User = require("../../models/user.js");
const { getUser } = require("../../models/userSqlite.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  const { email, password } = await req.body;

  // const user = await User.findOne({ email: email.toLowerCase() });
  await getUser({ email: email.toLowerCase() })
    .then((response) => {
      if (bcrypt.compare(password, response.password)) {
        //creation du JWT token
        const token = jwt.sign(
          {
            userId: response._id,
            email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).json({
          userDetails: {
            email: response.email,
            token: token,
            username: response.username,
          },
        });
      } else {
        return res
          .status(400)
          .send("Données utilisateurs invalides. Veuillez réessayer");

      }
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .send("Oops ! quelque chose s'est mal passé. Veuillez réessayer");
    });
};

module.exports = postLogin;
