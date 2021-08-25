const usuariosGet = (req, res) => {
    const {q, nombre, apikey} = req.query;
    res.status(200).json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
};
const usuariosPost = (req, res) => {
    const {nombre, edad} = req.body;

    res.status(200).json({
        msg: 'post API - controlador',
        nombre,
        edad
})};
const usuariosPut = (req, res) => {
    
    const id = req.params.id;
    
    res.status(200).json({
        msg: 'put API - controlador',
        id
    });
};
const usuariosPatch = (req, res) => {
    res.status(200).json({
        msg: 'patch API - controlador'
    });
};
const usuariosDelete = (req, res) => {
    res.status(200).json({
        msg: 'delete API - controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};