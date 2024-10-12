// middleware/autenticarJWT.js
const jwt = require('jsonwebtoken');

const autenticarJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Obtiene el token de los headers

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido.' });
        }

        req.user = user; // Guarda la información del usuario en la solicitud
        next();
    });
};

module.exports = autenticarJWT;
