const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const login = async (req, res) => {

    const { correo, password } = req.body;

    try {
        // Verificar si correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
        // Verificar si usuario está activo
        if (!usuario.estado) return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false'
        });
        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) return res.status(400).json({
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

const googleSignIn = async (req, res) => {

    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        // Verificar si correo existe
        let usuario = await Usuario.findOne({ correo });

        // Si el usuario no existe se crea
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: 'google-password',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario existe pero en bd está eliminado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (err) {
        res.status(400).json({
            msg: 'Token de google no es reconocido'
        });
    }
};

module.exports = {
    login,
    googleSignIn
};