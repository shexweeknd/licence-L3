const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && bcrypt.compare(password, user.password)) {
         
      //creation du JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        userDetails: {
          email: user.email,
          token: token,
          username: user.username,
        },
      });
    }

    return res
      .status(400)
      .send("Données utilisateurs invalides. Veuillez réessayer");
  } catch (err) {
    return res
      .status(500)
      .send("Oops ! quelque chose s'est mal passé. Veuillez réessayer");
  }
};

module.exports = postLogin;
