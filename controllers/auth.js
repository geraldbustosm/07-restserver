const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res) => {

    const { correo, password } = req.body;

    try {
        // Verificar si correo existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
        // Verificar si usuario está activo
        if(!usuario.estado) return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false'
        });
        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword) return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
        });
        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        });

    } catch (err) {
        res.status(500).json({
            msg: 'Error interno'
        });
    }

};

module.exports = {
    login
};