const Categoria = require('../models/categoria');

const obtenerCategorias = async (req, res) => {

    const { desde = 0, limite = 5 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });
};

const obtenerCategoria = async (req, res) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    res.json({ categoria });

};

const crearCategoria = async (req, res) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({ categoria });
}

const actualizarCategoria = async (req, res) => {

    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();

    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json({ categoria });

};

const borrarCategoria = async (req, res) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.status(200).json(categoria);

};


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
    crearCategoria
};