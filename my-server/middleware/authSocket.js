const jwt = require("jsonwebtoken");

const config = process.env

const verifySocketToken = (socket, next) => {
    const token = socket.handshake.auth?.token;

    try {
        const decoded = jwt.verify(token, config.JWT_KEY);
        socket.user = decoded;
    } catch (err) {
        const socketError = new Error('UNATHORIZED mfkr');
        return next(socketError)
    }

    next()
}

module.exports = verifySocketToken;