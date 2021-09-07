const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la solicitud'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        // Leer usuario que corresponde al uid

        const usuario = await Usuario.findById(uid);

        if (!usuario) return res.status(401).json({
            msg: 'Token no válido - usuario no existe en bd'
        });

        // Verificar si el usuario tiene estado en true
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            });
        }

        req.usuario = usuario;
        next();

    } catch (err) {
        res.status(401).json({
            msg: 'token no valido'
        });
    }

};

module.exports = {
    validarJWT
};