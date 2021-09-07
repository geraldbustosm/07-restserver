const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuariosGet = async (req, res) => {

    const { desde = 0, limite = 5 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
};
const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.json(usuario);
};

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    if (password) {
        // Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json(usuario);
};

const usuariosDelete = async (req, res) => {
    const { id } = req.params;

    // Fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    // Logicamente
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({ usuario });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};